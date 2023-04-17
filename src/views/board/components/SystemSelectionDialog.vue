<template>
  <v-dialog v-model="showOverlay" class="d-flex justify-end ma-16" max-width="40rem">
    <v-card class="pa-4">
      <v-card-title>System Selection</v-card-title>
      <v-row>
        <v-col>
          <v-card-subtitle>
            <p>System: {{ gameStore.selectedSystemId }}</p>
            <p>Type: Nebula</p>
          </v-card-subtitle>
          <v-card-text>
            <v-list>
              <v-list-item-title>SPACE</v-list-item-title>
              <v-list-item v-for="[unit, quantity] in Object.entries(systemUnits.space)" :key="unit">
                {{ unit }} ({{ quantity }})
              </v-list-item>
              <template v-for="[planet, units] in Object.entries(systemUnits.planets)" :key="planet">
                <v-list-item-title>Planet: {{ planet.toLocaleUpperCase() }}</v-list-item-title>
                <v-list-item v-for="[unit, quantity] in Object.entries(units)" :key="unit">
                  {{ unit }} ({{ quantity }})
                </v-list-item>
              </template>
            </v-list>
          </v-card-text>
        </v-col>
        <v-col>
          <v-list-item-title>Activated By:</v-list-item-title>
          <v-list-item v-for="player in system?.activatedBy"
            >{{ player.faction }} ({{ player.user?.display_name }})</v-list-item
          >
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn block color="primary" variant="elevated" @click="activateSystem" :disabled="!canActivateSystem()"
          >Activate</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGameStore } from '../../../stores/game'
import { System } from '../../../models/system'

export default defineComponent({
  name: 'SystemSelectionDialog',
  setup() {
    const gameStore = useGameStore()
    return { gameStore }
  },
  methods: {
    activateSystem() {
      if (this.gameStore.selectedSystemId !== null) this.gameStore.activateSystem(this.gameStore.selectedSystemId)
    },
    canActivateSystem(): boolean {
      const playerId: number = this.gameStore.getPlayer?.id || 0
      const activatedByPlayer = this.system?.activatedByIds.includes(playerId)
      return !activatedByPlayer
    },
  },
  computed: {
    showOverlay: {
      get(): boolean {
        return this.gameStore.selectedSystemId !== null
      },
      set(value: boolean) {
        if (!value) {
          this.gameStore.selectedSystemId = null
        }
      },
    },
    system(): System | null {
      return this.gameStore.getSelectedSystem
    },
    systemUnits() {
      if (this.gameStore.getSelectedSystem === null)
        return {
          space: {},
          planets: {},
        }
      const units = this.gameStore.getSelectedSystem?.units.map((unit) => unit.type)
      const unitCounts = Object.fromEntries(units.map((unit) => [unit, 0]))
      units.forEach((unit) => {
        unitCounts[unit] += 1
      })
      const planets = this.gameStore.getSelectedSystem?.planets
      const planetCounts = Object.fromEntries(planets.map((planet) => [planet.id, { infantry: 3 }]))

      return {
        space: unitCounts,
        planets: planetCounts,
      }
    },
  },
})
</script>

<style scoped></style>

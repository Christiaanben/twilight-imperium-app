<template>
  <v-dialog v-model="showOverlay" class="d-flex justify-end ma-16" max-width="40rem">
    <v-card class="pa-4">
      <v-card-title>System Selection</v-card-title>
      <v-card-subtitle>
        <p>System: {{ gameStore.selectedSystemId }}</p>
        <p>Type: Nebula</p>
      </v-card-subtitle>
      <v-card-text>
        <v-list>
          <v-list-item-title>SPACE</v-list-item-title>
          <v-list-item> Carrier (1) </v-list-item>
          <v-list-item-title>Planet: X</v-list-item-title>
          <v-list-item> Infantry (3) </v-list-item>
          <v-list-item-title>Planet: Y</v-list-item-title>
          <v-list-item> PDS (1) </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary" variant="elevated">Activate</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGameStore } from '../../../stores/game'

export default defineComponent({
  name: 'SystemSelectionDialog',
  setup() {
    const gameStore = useGameStore()
    return { gameStore }
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
  },
})
</script>

<style scoped></style>

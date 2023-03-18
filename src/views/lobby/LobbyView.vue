<template>
  <v-card
    class="d-flex justify-center align-center"
    density="comfortable"
    height="100%"
    image="/img/spacestation.webp"
    theme="dark"
  >
    <v-sheet class="pa-4 overflow-auto" color="rgb(0, 0, 0, 0.8)" height="95%" position="fixed" rounded width="65%">
      <h1>Lobby ID:</h1>
      <h3 class="py-4">
        {{ lobbyStore.lobby?.id }}
        <v-tooltip v-model="showClipboardText" :open-on-hover="false">
          <template v-slot:activator="{ props }">
            <v-btn
              class="mx-6"
              color="grey-darken-1"
              icon="mdi-content-copy"
              v-bind="props"
              @click="copyClipboard"
            ></v-btn>
          </template>
          <span>Copied</span>
        </v-tooltip>
      </h3>
      <v-list>
        <v-list-item v-for="player in lobbyStore.lobby?.players">
          <v-label>Player: {{ player.user?.display_name }}</v-label>
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="player.faction"
                :disabled="isDisabled(player)"
                :items="getAvailableFactions()"
                item-title="name"
                item-value="id"
                label="Faction"
              >
                <template v-slot:selection="{ item }">
                  {{ lobbyStore.getFactions.find((faction) => faction.id === item.value)?.name }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="player.color"
                :bg-color="player.color || 'none'"
                :disabled="isDisabled(player)"
                :items="getAvailableColors()"
                label="Color"
              />
            </v-col>
            <v-col cols="3">
              <!-- Other Players -->
              <v-checkbox
                v-if="isDisabled(player)"
                v-model="player._isReady"
                :disabled="isDisabled(player)"
                color="primary"
                hide-details
                label="Ready"
              ></v-checkbox>
              <!-- Your Player -->
              <v-checkbox v-else v-model="isReady" color="primary" hide-details label="Ready"></v-checkbox>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import { useLobbyStore } from '../../stores/lobby'
import { defineComponent } from 'vue'
import { Faction, FACTIONS } from '../../interfaces/faction'
import { Color, COLORS } from '../../interfaces/color'
import type { Player } from '../../models/player'
import { useAuthStore } from '../../stores/auth'

export default defineComponent({
  name: 'LobbyView',
  setup() {
    const authStore = useAuthStore()
    const lobbyStore = useLobbyStore()
    return {
      authStore,
      lobbyStore,
      FACTIONS,
      COLORS,
    }
  },
  data: () => ({
    showClipboardText: false,
  }),
  async mounted() {
    await this.lobbyStore.fetchLobby(this.$route.params.id as string)
    this.lobbyStore.connectWS()
  },
  methods: {
    getAvailableFactions(): Faction[] {
      const playerFactions = this.lobbyStore.lobby?.players.map((player) => player.faction) || ([] as string[])
      return this.lobbyStore.getFactions.filter((faction: Faction) => {
        return !playerFactions.includes(faction.id)
      })
    },
    getAvailableColors(): Color[] {
      const playerColors = this.lobbyStore.lobby?.players.map((player) => player.color) || []
      return COLORS.filter((v) => !playerColors.includes(v))
    },
    isDisabled(player: Player): boolean {
      return player.user?.id != this.authStore.account?.id
    },
    copyClipboard() {
      // Get the text field
      const copyText = this.lobbyStore.lobby?.id || ''

      // Copy the text inside the text field
      navigator.clipboard.writeText(copyText)

      this.showClipboardText = true
      setTimeout(() => (this.showClipboardText = false), 1000)
    },
  },
  computed: {
    isReady: {
      get(): boolean {
        const player = this.lobbyStore.getPlayer
        if (player) return player.isReady
        return false
      },
      set(newValue: boolean) {
        const player = this.lobbyStore.getPlayer
        if (player) player.isReady = newValue
      },
    },
  },
})
</script>

<style scoped></style>

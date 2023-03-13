<template>
  <v-card
    class="d-flex justify-center align-center"
    density="comfortable"
    height="100%"
    image="/img/spacestation.webp"
    theme="dark"
  >
    <v-sheet class="pa-4 overflow-auto" position="fixed" width="65%" height="95%" rounded color="rgb(0, 0, 0, 0.8)">
      <h1>Lobby ID:</h1>
      <h3 class="py-4">
        {{ lobbyStore.lobby?.id }}
        <v-tooltip :open-on-hover="false" v-model="showClipboardText">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              class="mx-6"
              color="grey-darken-1"
              icon="mdi-content-copy"
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
                label="Faction"
              />
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="player.color"
                :disabled="isDisabled(player)"
                :items="getAvailableColors()"
                label="Color"
                :bg-color="player.color || 'none'"
              />
            </v-col>
            <v-col cols="3">
              <!-- Other Players -->
              <v-checkbox
                :disabled="isDisabled(player)"
                v-if="isDisabled(player)"
                v-model="player._isReady"
                label="Ready"
                color="primary"
                hide-details
              ></v-checkbox>
              <!-- Your Player -->
              <v-checkbox v-else v-model="isReady" label="Ready" color="primary" hide-details></v-checkbox>
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
      const playerFactions = this.lobbyStore.lobby?.players.map((player) => player.faction) || []
      return FACTIONS.filter((v) => !playerFactions.includes(v))
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

<template>
  <h4>Lobby ID: {{ lobbyStore.lobby?.id }}</h4>
  <v-list>
    <v-list-item v-for="player in lobbyStore.lobby?.players">
      <div class="ma-2">Your player: {{ player }}</div>
      <v-row>
        <v-col cols="8">
          <v-select
            v-model="player.faction"
            :disabled="isDisabled(player)"
            :items="getAvailableFactions()"
            label="Faction"
          />
        </v-col>
        <v-col cols="4">
          <v-select v-model="player.color" :disabled="isDisabled(player)" :items="getAvailableColors()" label="Color" />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item v-for="_ in MAX_PLAYER - (lobbyStore.lobby?.players || []).length"> -</v-list-item>
  </v-list>
  <v-switch v-model="isReady" label="Ready" />
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
    MAX_PLAYER: 6,
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
      return player.user?.id != this.authStore.user.id
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

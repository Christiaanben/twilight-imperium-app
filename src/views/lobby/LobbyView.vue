<template>
  <h4>Lobby ID: {{ gameStore.lobbyId }}</h4>
  <v-list>
    <v-list-item v-for="player in gameStore.lobby?.players">
      <div class="ma-2">Your player: {{ player }}</div>
      <v-row>
        <v-col cols="8">
          <v-select v-model="player.faction" :items="getAvailableFactions()" label="Faction" />
        </v-col>
        <v-col cols="4">
          <v-select v-model="player.color" :items="getAvailableColors()" label="Color" />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item v-for="_ in MAX_PLAYER - (gameStore.lobby?.players || []).length"> -</v-list-item>
  </v-list>
  <v-switch v-model="isReady" label="Ready" />
</template>

<script lang="ts">
import { useGameStore } from '../../stores/game'
import { defineComponent } from 'vue'
import { Faction, FACTIONS } from '../../interfaces/faction'
import { Color, COLORS } from '../../interfaces/color'

export default defineComponent({
  name: 'LobbyView',
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore,
      FACTIONS,
      COLORS,
    }
  },
  data: () => ({
    isReady: false,
    MAX_PLAYER: 6,
  }),
  mounted() {
    this.gameStore.connectWS()
  },
  methods: {
    getAvailableFactions(): Faction[] {
      const playerFactions = this.gameStore.lobby?.players.map((player) => player.faction) || []
      return FACTIONS.filter((v) => !playerFactions.includes(v))
    },
    getAvailableColors(): Color[] {
      const playerColors = this.gameStore.lobby?.players.map((player) => player.color) || []
      return COLORS.filter((v) => !playerColors.includes(v))
    },
  },
})
</script>

<style scoped></style>

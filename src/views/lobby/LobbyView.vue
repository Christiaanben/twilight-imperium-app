<template>
  <h4>Lobby ID: {{ gameStore.lobbyId }}</h4>
  <v-list>
    <v-list-item v-for="player in gameStore.lobby?.players">
      <div class="ma-2">You {{ player }}</div>
      <v-row>
        <v-col cols="8"> <v-select label="Faction" :items="['Lions', 'Bugs', 'Fish', 'Humans']" /></v-col
        ><v-col cols="4"> <v-select label="Color" :items="['red', 'yellow', 'green']" /></v-col>
      </v-row>
    </v-list-item>
    <v-list-item v-for="_ in MAX_PLAYER - (gameStore.lobby?.players || []).length"> - </v-list-item>
  </v-list>
  <v-switch label="Ready" v-model="isReady" />
</template>

<script lang="ts">
import { useGameStore } from '../../stores/game'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LobbyView',
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore,
    }
  },
  data: () => ({
    isReady: false,
    MAX_PLAYER: 6,
  }),
  mounted() {
    this.gameStore.connectWS()
  },
})
</script>

<style scoped></style>

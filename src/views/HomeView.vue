<template>
  <h1>home view</h1>
  <h2>Start a new game</h2>
  <h4>============================</h4>
  <h2>Already part of a game?</h2>
  <h3>Enter game ID</h3>
  <v-text-field label="Lobby ID" v-model="lobbyId" />
  <v-btn @click="connect">Connect</v-btn>
</template>

<script lang="ts">
import { useGameStore } from '../stores/game'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore,
    }
  },
  data: () => ({
    lobbyId: '',
  }),
  methods: {
    connect() {
      this.gameStore.lobbyId = this.lobbyId
      this.$router.push('/lobby')
    },
  },
})
</script>

<style scoped></style>

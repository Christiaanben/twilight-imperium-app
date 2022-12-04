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
import { useLobbyStore } from '../stores/lobby'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const lobbyStore = useLobbyStore()
    return {
      lobbyStore,
    }
  },
  data: () => ({
    lobbyId: '',
  }),
  methods: {
    async connect() {
      await this.lobbyStore.fetchLobby(this.lobbyId)
      this.$router.push('/lobby')
    },
  },
})
</script>

<style scoped></style>

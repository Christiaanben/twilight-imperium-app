<template>
  <h2>New Game</h2>
  <h3>Game Setup</h3>
  <div>
    <v-label>Game Name</v-label>
    <v-text-field v-model="name" />
  </div>
  <v-btn @click="createLobby">Create Lobby</v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLobbyStore } from '../../stores/lobby'

export default defineComponent({
  name: 'SetupView',
  setup() {
    const lobbyStore = useLobbyStore()
    return {
      lobbyStore,
    }
  },
  data: () => ({
    name: '',
  }),
  methods: {
    async createLobby() {
      await this.lobbyStore.createLobby(this.name)
      this.$router.push('/lobby')
    },
  },
})
</script>

<style scoped></style>

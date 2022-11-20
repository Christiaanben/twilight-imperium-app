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
import { useGameStore } from '../../stores/game'

export default defineComponent({
  name: 'SetupView',
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore,
    }
  },
  data: () => ({
    name: '',
  }),
  methods: {
    async createLobby() {
      await this.gameStore.createLobby(this.name)
      this.$router.push('/lobby')
    },
  },
})
</script>

<style scoped></style>

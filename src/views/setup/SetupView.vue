<template>
  <h2>New Game</h2>
  <h3>Game Setup</h3>
  <div>
    <v-label>Game Name</v-label>
    <v-text-field />
  </div>
  <v-btn @click="createLobby">Create Lobby</v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGameStore } from '../../stores/game'

export default defineComponent({
  name: 'SetupView',
  methods: {
    async createLobby() {
      await useGameStore().createLobby()
      this.$router.push('/lobby')
    },
  },
})
</script>

<style scoped></style>

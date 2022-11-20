<template>
  <h4>Lobby ID: {{ gameStore.lobbyId }}</h4>
  <v-list>
    <v-list-item>
      You
      <v-select :items="['Lions', 'Bugs', 'Fish']" />
    </v-list-item>
    <v-list-item> - </v-list-item>
    <v-list-item> - </v-list-item>
    <v-list-item> - </v-list-item>
  </v-list>
  <v-switch label="Ready" v-model="isReady" />
</template>

<script lang="ts">
import { connect } from '../../services/web-service'
import { useGameStore } from '../../stores/game'

export default {
  name: 'LobbyView',
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore,
    }
  },
  data: () => ({
    isReady: false,
  }),
  mounted() {
    connect('lobby')
  },
}
</script>

<style scoped></style>

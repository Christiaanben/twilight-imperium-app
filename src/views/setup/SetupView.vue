<template>
  <v-card
    class="d-flex justify-center align-center"
    density="comfortable"
    height="100%"
    image="/img/spaceships.webp"
    theme="dark"
  >
    <v-sheet class="pa-4 overflow-auto" position="fixed" width="60%" height="95%" rounded color="rgb(0, 0, 0, 0.8)">
      <h1 class="py-2">Create Game</h1>
      <v-text-field
        v-model="name"
        variant="filled"
        label="Game Name"
        append-icon="mdi-dice-multiple"
        @click:append="randomGameName"
      ></v-text-field>
      <v-select v-model="gameType" label="Game Type" :items="gameTypes"></v-select>
      <v-text-field v-if="gameType == 'Private'" label="Password"></v-text-field>
      <v-slider
        v-model="playersCount"
        :max="3"
        :step="1"
        label="Players"
        :ticks="playerLabels"
        show-ticks="always"
        tick-size="4"
      ></v-slider>
      <v-radio-group label="Victory Points" v-model="victoryPoints">
        <v-radio label="10" value="10"></v-radio>
        <v-radio label="14" value="14"></v-radio>
      </v-radio-group>
      <v-container>
        <v-row>
          <v-label>Win Conditions</v-label>
        </v-row>
        <v-row style="margin-bottom: -45px">
          <v-col cols="4"
            ><v-checkbox model-value="domination" label="Domination" value="domination" disabled></v-checkbox
          ></v-col>
          <v-col cols="4"><v-checkbox label="Victory"></v-checkbox></v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-label>Expansions</v-label>
        </v-row>
        <v-row>
          <v-col cols="4"><v-checkbox label="Prophecy of kings" value="pok"></v-checkbox></v-col>
        </v-row>
      </v-container>
      <v-btn @click="createLobby" color="primary">Done</v-btn>
    </v-sheet>
  </v-card>
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
    gameType: null,
    gameTypes: ['Public', 'Private', 'Invite Only'],
    playersCount: 3,
    playerLabels: { 0: '3', 1: '4', 2: '5', 3: '6' },
    victoryPoints: 10,
  }),
  methods: {
    async createLobby() {
      await this.lobbyStore.createLobby(this.name)
      this.$router.push({ name: 'lobby', params: { id: this.lobbyStore.lobby?.id } })
    },
    randomGameName() {},
  },
})
</script>

<style scoped></style>

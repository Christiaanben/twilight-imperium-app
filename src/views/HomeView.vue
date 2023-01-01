<template>
  <h1>home view</h1>
  <h2>Start a new game</h2>
  <h4>============================</h4>
  <h2>Already part of a game?</h2>
  <h3>Enter game ID</h3>
  <v-text-field label="Lobby ID" v-model="lobbyId" />
  <v-btn @click="connect">Connect</v-btn>

  <v-row>
    <v-col cols="4">
      <ti-card
        type="action"
        title="Sabotage"
        body="When another player plays an action card other than 'Sabotage':<br />Cancel that action card."
        flavor="Unlenn smashed a clenched fist into the bulkhead, green eyes ablaze with rage. The entire plan had been turned on its head. Such incompetence was unfathomable."
      />
    </v-col>
    <v-col cols="4">
      <ti-card
        type="promissory"
        title="Trade Agreement"
        body="When the blue player replenishes commodities:<br/>The blue player gives you all of his commodities. <br/>Then, return this card to the blue player."
      />
    </v-col>
    <v-col cols="4">
      <ti-card
        type="secret"
        title="Unveil Flagship"
        subtitle="Action Phase"
        body="Win a space combat in a system that contains your flagship.<br/> You cannot score this objective if your flagship is destroyed in the combat."
      />
    </v-col>
    <v-col cols="4">
      <ti-card
        type="stage1"
        title="Expand Borders"
        subtitle="Status Phase"
        body="Control 6 planets in non-home systems."
      />
    </v-col>
    <v-col cols="4">
      <ti-card
        type="agenda"
        title="Conventions of War"
        subtitle="Directive"
        body="For: Players cannot use BOMBARDMENT against units that are on cultural planets.<br/>Against: Each player that voted 'Against' discards all of his action cards."
      />
    </v-col>
    <v-col cols="4">
      <ti-card
        type="stage2"
        title="Galvanize the People"
        subtitle="Status Phase"
        body="Spend a total of 6 tokens from your tactic and/or strategy pools."
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { useLobbyStore } from '../stores/lobby'
import { defineComponent } from 'vue'
import TiCard from '../components/cards/TiCard.vue'

export default defineComponent({
  name: 'HomeView',
  components: { TiCard },
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
      this.$router.push({ name: 'lobby', params: { id: this.lobbyId } })
    },
  },
})
</script>

<style scoped></style>

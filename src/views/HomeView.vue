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
        flavor="Unlenn smashed a clenched fist into the bulkhead, green eyes ablaze with rage. The entire plan had been turned on its head. Such incompetence was unfathomable."
      />
    </v-col>
    <v-col cols="4">
      <ti-card type="agenda" title="Conventions of War" subtitle="Law" />
    </v-col>
    <v-col cols="4">
      <ti-card type="promissory" title="Trade Agreement" />
    </v-col>
    <v-col cols="4">
      <ti-card type="secret" title="Unveil Flagship" subtitle="Action Phase" />
    </v-col>
    <v-col cols="4">
      <ti-card type="stage1" title="Expand Borders" subtitle="Status Phase" />
    </v-col>
    <v-col cols="4">
      <ti-card type="stage2" title="Galvanize the People" subtitle="Status Phase" />
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

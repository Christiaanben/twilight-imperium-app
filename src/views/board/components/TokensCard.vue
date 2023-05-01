<template>
  <v-card class="mx-2 pa-2 rounded-t-lg rounded-b-0" height="200" width="300">
    <v-card-title>Tokens</v-card-title>
    <p>Tactic Tokens: {{ player?.nTacticTokens }}</p>
    <p>Fleet Tokens: {{ player?.nFleetTokens }}</p>
    <p>Strategy Tokens: {{ player?.nStrategyTokens }}</p>
    <p>Trade Goods: 0</p>
    <p>Commodities: 0/0</p>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Player } from '../../../models/player'

export default defineComponent({
  name: 'TokensCard',
  props: {
    player: {
      type: Player,
    },
  },
})
</script>

<style scoped></style>

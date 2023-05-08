<template>
  <v-overlay width="100vw">
    <template v-slot:activator="{ isActive, props }">
      <v-card v-bind="props" height="80" width="500" @click="" style="background-color: transparent">
        <v-img src="/img/victory-point-tracker-10.webp" />
      </v-card>
    </template>
    <v-row>
      <v-col cols="4" lg="2" v-for="card in gameStore.cards.filter((value) => value.type == 'stage_1')">
        <ti-card type="stage1" :title="card.name" :subtitle="card.subtitle" :body="card.body" />
      </v-col>
      <v-col cols="4" lg="2" v-for="_ in 5 - gameStore.cards.filter((value) => value.type == 'stage_1').length">
        <ti-card type="stage1_back" title="" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" lg="2" v-for="card in gameStore.cards.filter((value) => value.type == 'stage_2')">
        <ti-card type="stage2" :title="card.name" :subtitle="card.subtitle" :body="card.body" />
      </v-col>
      <v-col cols="4" lg="2" v-for="_ in 5 - gameStore.cards.filter((value) => value.type == 'stage_2').length">
        <ti-card type="stage2_back" title="" />
      </v-col>
    </v-row>
  </v-overlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TiCard from '../../../components/cards/TiCard.vue'

import { useGameStore } from '../../../stores/game'

export default defineComponent({
  name: 'VictoryPointTrackerOverlay',
  components: { TiCard },
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore,
    }
  },
})
</script>

<style scoped></style>

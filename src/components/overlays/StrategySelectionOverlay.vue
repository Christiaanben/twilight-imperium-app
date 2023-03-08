<template>
  <v-btn
    class="mx-4 my-auto view-board over-overlay"
    color="secondary"
    icon
    size="large"
    @click="showOverlay = !showOverlay"
  >
    <v-icon size="large">{{ showOverlay ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
  </v-btn>

  <v-overlay :model-value="showOverlay" width="100vw">
    <v-row class="pa-2 px-16">
      <v-col
        v-for="(strategy, i) in gameStore.getStrategies"
        class="py-6 d-flex flex-column px-2 position-relative"
        cols="3"
      >
        <flip-card :flipped="strategy.player !== null" style="height: 40vh">
          <template v-slot:front>
            <v-img :src="`/img/strategy/${i + 1}-front.webp`" />
          </template>
          <template v-slot:back>
            <v-img :src="`/img/strategy/${i + 1}-back.webp`" />
          </template>
        </flip-card>
        <div
          class="d-flex justify-space-around position-absolute flex-column"
          style="right: 0; left: 15%; bottom: 0; top: 0"
        >
          <v-img
            v-if="strategy.player"
            :src="`/img/control-tokens/${strategy.player.faction}.webp`"
            class="mx-auto"
            width="35%"
          />
        </div>
        <v-btn :disabled="strategy.player !== null" class="my-2 mx-14" color="primary" @click="select(i)">Select</v-btn>
      </v-col>
    </v-row>
  </v-overlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FlipCard from '../cards/FlipCard.vue'
import { useGameStore } from '../../stores/game'
import { STRATEGY_TYPES } from '../../interfaces/strategy-type'

export default defineComponent({
  name: 'StrategySelectionOverlay',
  components: { FlipCard },
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore,
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  methods: {
    select(i: number) {
      this.gameStore.selectStrategy(STRATEGY_TYPES[i])
    },
  },
  computed: {
    showOverlay: {
      get(): boolean {
        return this.modelValue
      },
      set(value: boolean) {
        this.$emit('update:modelValue', value)
      },
    },
    strategies() {
      let strats = [null, null, null, null, null, null, null, null] as (string | null)[]
      this.gameStore.strategies.forEach((strategy) => {
        strats[strategy.initiative - 1] = 'Emirates of Hacan'
      })
      return strats
    },
  },
})
</script>

<style scoped>
.view-board {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
}

.over-overlay {
  z-index: 9999;
}
</style>

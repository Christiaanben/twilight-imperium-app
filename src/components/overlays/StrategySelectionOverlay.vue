<template>
  <v-btn color="secondary" class="mx-4 my-auto view-board over-overlay" @click="showOverlay = !showOverlay">
    Toggle Board
  </v-btn>

  <v-overlay :model-value="showOverlay" width="100vw">
    <v-row class="pa-2 px-16">
      <v-col v-for="(selection, i) in selections" class="py-6 d-flex flex-column px-2 position-relative" cols="3">
        <flip-card :flipped="selection !== null" style="width: 25vw; height: 40vh">
          <template v-slot:front>
            <v-img :src="`/img/strategy/${i + 1}.png`" />
          </template>
          <template v-slot:back>
            <v-img :src="`/img/strategy/${i + 1}-back.png`" />
          </template>
        </flip-card>
        <div
          class="d-flex justify-space-around position-absolute flex-column"
          style="right: 0; left: 0; bottom: 0; top: 0"
        >
          <v-sheet v-if="selection" class="pa-2 rounded mx-auto">{{ selection }}</v-sheet>
        </div>

        <v-btn class="my-2 mx-14" color="primary" :disabled="selection !== null" @click="select(i)">Select</v-btn>
      </v-col>
    </v-row>
  </v-overlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FlipCard from '../cards/FlipCard.vue'

export default defineComponent({
  name: 'StrategySelectionOverlay',
  components: { FlipCard },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    selections: [null, null, null, null, null, null, null, null] as (string | null)[],
  }),
  methods: {
    select(i: number) {
      this.selections[i] = 'Fediration of Sol'
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

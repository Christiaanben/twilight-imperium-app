<template>
  <v-btn color="secondary" class="mx-4 my-auto view-board over-overlay" @click="showOverlay = !showOverlay">
    Toggle Board
  </v-btn>

  <v-overlay :model-value="showOverlay" width="100vw">
    <v-row class="pa-2 px-16">
      <v-col v-for="(selection, i) in selections" class="py-6 d-flex flex-column px-2 position-relative" cols="3">
        <v-img
          :src="selection === null ? `/img/strategy/${i + 1}.png` : `/img/strategy/${i + 1}-back.png`"
          height="40vh"
          width="25vw"
        />
        <div
          class="d-flex justify-space-around position-absolute flex-column"
          style="right: 0; left: 0; bottom: 0; top: 0"
        >
          <v-sheet v-if="selection" class="pa-2 rounded mx-auto">{{ selection }}</v-sheet>
        </div>

        <v-btn class="my-2 mx-14" color="primary" :disabled="selection !== null">Select</v-btn>
      </v-col>
    </v-row>
  </v-overlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StrategySelectionOverlay',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    selections: [null, 'Fediration of Sol', null, null, null, null, null, null],
  }),
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

<template>
  <v-btn color="secondary" class="mx-4 my-auto view-board over-overlay" @click="showOverlay = !showOverlay">
    Toggle Board
  </v-btn>

  <v-overlay :model-value="showOverlay" width="100vw">
    <v-row class="pa-2 px-16">
      <v-col v-for="i in 8" class="py-6 d-flex flex-column px-2" cols="3">
        <v-img :src="`/img/strategy/${i}.png`" height="40vh" width="25vw" />
        <v-btn class="my-2 mx-14" color="primary">Select</v-btn>
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

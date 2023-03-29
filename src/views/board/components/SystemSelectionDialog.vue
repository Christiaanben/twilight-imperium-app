<template>
  <v-dialog v-model="showOverlay" max-width="50rem" class="d-flex justify-end ma-16">
    <v-card>
      <v-card-title>System Selection</v-card-title>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGameStore } from '../../../stores/game'

export default defineComponent({
  name: 'SystemSelectionDialog',
  setup() {
    const gameStore = useGameStore()
    return { gameStore }
  },
  computed: {
    showOverlay: {
      get(): boolean {
        return this.gameStore.selectedSystemId !== null
      },
      set(value: boolean) {
        if (!value) {
          this.gameStore.selectedSystemId = null
        }
      },
    },
  },
})
</script>

<style scoped></style>

<template>
  <v-dialog v-model="showOverlay" max-width="40rem">
    <v-card class="pa-4">
      <v-card-title>Card Activation</v-card-title>
      <v-row class="pa-4">
        <v-col cols="6">
          <ti-card
            v-if="card"
            :body="card.body"
            :flavor="card.flavor"
            :subtitle="card.subtitle"
            :title="card.name"
            :type="card.type"
          />
        </v-col>
        <v-col cols="6">
          <div v-if="false">
            <v-label>Choose a planet</v-label>
            <v-select :items="['planet1', 'planet2', 'planet3']" label="Planet" outlined />
          </div>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn block color="primary" variant="elevated" @click="activateCard()">Activate</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TiCard from '@/components/cards/TiCard.vue'
import { useGameStore } from '../../../stores/game'
import type { Card } from '../../../models/card'

export default defineComponent({
  name: 'CardActivationDialog',
  components: { TiCard },
  setup() {
    const gameStore = useGameStore()
    return { gameStore }
  },
  data: () => ({}),
  methods: {
    activateCard() {
      console.debug(`CardActivationDialog.activateCard: ${this.card?.name}`)
      this.gameStore.activateCard(this.gameStore.selectedCardId as string)
    },
  },
  computed: {
    showOverlay: {
      get(): boolean {
        return this.gameStore.selectedCardId !== null
      },
      set(value: boolean) {
        if (!value) {
          this.gameStore.selectedCardId = null
        }
      },
    },
    card(): Card | null {
      return this.gameStore.getSelectedCard
    },
  },
})
</script>

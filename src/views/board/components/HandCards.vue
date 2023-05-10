<template>
  <div class="cards">
    <div v-for="(card, i) in cards" class="card">
      <div
        :style="`background: transparent;transform: translateY(${offset(i)}px) rotate(${rotation(i)}deg) scale(.8)`"
        class="card-face"
      >
        <ti-card
          :type="card.type"
          :title="card.name"
          :subtitle="card.subtitle"
          :body="card.body"
          :flavor="card.flavor"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import TiCard from '@/components/cards/TiCard.vue'
import type { Card } from '../../../models/card'

export default defineComponent({
  name: 'HandCards',
  props: {
    cards: {
      type: Array as PropType<Card[]>,
      default: () => [],
    },
  },
  data: () => ({
    rotationRange: 50,
    offsetRange: 80,
  }),
  components: { TiCard },
  methods: {
    rotation(i: number) {
      return ((i - (this.cards.length - 1) / 2) / (this.cards.length - 2)) * this.rotationRange
    },
    offset(i: number) {
      return Math.abs(((i - (this.cards.length - 1) / 2) / (this.cards.length - 2)) * this.offsetRange)
    },
  },
})
</script>

<style scoped>
.cards {
  bottom: 0;
  display: flex;
  height: 150px;
  padding: 0 50px;
  justify-content: center;
  position: fixed;
}

.card {
  margin: 0 -25px;
  position: relative;
  width: 100px;
}

.card:after {
  /*background: rgba(255, 0, 0, 0.15); !* comment out *!*/
  bottom: 0;
  content: '';
  left: -60px;
  position: absolute;
  right: -60px;
  top: 0;
  z-index: 10;
}

.card-face {
  margin-left: -50px;
  bottom: 0;
  content: '';
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: 800ms cubic-bezier(0.19, 1, 0.22, 1) transform;
}

.card-face:after {
  animation: none;
  background: #fff;
  bottom: 0;
  content: '';
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.card:hover > .card-face {
  transform: translateY(-175px) rotate(0deg) scale(1) !important;
  transition-duration: 0ms;
  z-index: 5;
}

.card:hover:after {
  top: -175px;
}
</style>

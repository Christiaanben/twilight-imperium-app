import VictoryPointTracker from "*.vue";
<template>
  <div class="cards">
    <div class="card" v-for="(val, i) in cards">
      <div
        class="card-face"
        :style="`background: linear-gradient(-135deg, hsla(240, 100%, 80%, 1), hsla(240, 90%, 45%, 1));transform: translateY(${offset(
          i
        )}px) rotate(${rotation(i)}deg)`"
      >
        <ti-card
          type="action"
          title="Sabotage"
          body="When another player plays an action card other than 'Sabotage':<br />Cancel that action card."
          flavor="Unlenn smashed a clenched fist into the bulkhead, green eyes ablaze with rage. The entire plan had been turned on its head. Such incompetence was unfathomable."
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TiCard from './TiCard.vue'

export default defineComponent({
  name: 'HandCards',
  data: () => ({
    cards: ['1', '2', '3', '4', '5'],
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
  left: 0;
  right: 0;
}

.card {
  height: 150px;
  margin: 0 -25px;
  position: relative;
  width: 100px;
}

.card:after {
  background: rgba(255, 0, 0, 0.15); /* comment out */
  bottom: 0;
  content: '';
  left: -60px;
  position: absolute;
  right: -60px;
  top: 0;
  z-index: 10;
}

.card-face {
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

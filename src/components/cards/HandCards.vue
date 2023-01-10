import VictoryPointTracker from "*.vue";
<template>
  <div class="cards">
    <div v-for="(card, i) in cards" class="card">
      <div
        :style="`background: linear-gradient(-135deg, hsla(240, 100%, 80%, 1), hsla(240, 90%, 45%, 1));transform: translateY(${offset(
          i
        )}px) rotate(${rotation(i)}deg) scale(.8)`"
        class="card-face"
      >
        <ti-card
          :type="card.type"
          :title="card.title"
          :subtitle="card.subtitle"
          :body="card.body"
          :flavor="card.flavor"
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
    cards: [
      {
        type: 'action',
        title: 'Sabotage',
        subtitle: '',
        body: 'When another player plays an action card other than "Sabotage":<br />Cancel that action card.',
        flavor:
          'Unlenn smashed a clenched fist into the bulkhead, green eyes ablaze with rage. The entire plan had been turned on its head. Such incompetence was unfathomable.',
      },
      {
        type: 'promissory',
        title: 'Trade Agreement',
        subtitle: '',
        body: 'When the blue player replenishes commodities:<br/>The blue player gives you all of his commodities. <br/>Then, return this card to the blue player.',
        flavor: '',
      },
      {
        type: 'secret',
        title: 'Unveil Flagship',
        subtitle: 'Action Phase',
        body: 'Win a space combat in a system that contains your flagship.<br/> You cannot score this objective if your flagship is destroyed in the combat.',
        flavor: '',
      },
      {
        type: 'stage1',
        title: 'Expand Borders',
        subtitle: 'Status Phase',
        body: 'Control 6 planets in non-home systems.',
        flavor: '',
      },
      {
        type: 'agenda',
        title: 'Conventions of War',
        subtitle: 'Directive',
        body: 'For: Players cannot use BOMBARDMENT against units that are on cultural planets.<br/>Against: Each player that voted "Against" discards all of his action cards.',
        flavor: '',
      },
      {
        type: 'stage2',
        title: 'Galvanize the People',
        subtitle: 'Status Phase',
        body: 'Spend a total of 6 tokens from your tactic and/or strategy pools.',
        flavor: '',
      },
    ],
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

<template>
  <strategy-selection-overlay v-model="strategySelection" v-if="gameStore.phase === 'strategy'" />
  <system-selection-dialog />
  <card-activation-dialog />

  <div id="pixiCanvas" ref="pixi" />
  <v-row class="d-flex justify-center" style="position: fixed; top: 4vh; width: 100vw; height: 10vh">
    <victory-point-tracker-overlay />
  </v-row>
  <v-row class="player-overlay">
    <v-col cols="3">
      <tokens-card :player="gameStore.getPlayer" />
    </v-col>
    <v-col cols="3">
      <hand-cards :cards="gameStore.getCardsByOwner(gameStore.getPlayer?.id || 0)" />
    </v-col>
    <v-col cols="3"> </v-col>
    <v-col cols="3"> </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { app, handleWheelEvent, createSystemSprite, board } from '../../services/graphics-service'
import { useGameStore } from '../../stores/game'
import StrategySelectionOverlay from './components/StrategySelectionOverlay.vue'
import * as webService from '../../services/web-service/index'
import SystemSelectionDialog from './components/SystemSelectionDialog.vue'
import CardActivationDialog from './components/CardActivationDialog.vue'
import TokensCard from './components/TokensCard.vue'
import TiCard from '../../components/cards/TiCard.vue'
import VictoryPointTrackerOverlay from './components/VictoryPointTrackerOverlay.vue'
import HandCards from './components/HandCards.vue'

export default defineComponent({
  name: 'BoardView',
  components: {
    VictoryPointTrackerOverlay,
    TiCard,
    SystemSelectionDialog,
    CardActivationDialog,
    StrategySelectionOverlay,
    TokensCard,
    HandCards,
  },
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore,
    }
  },
  async mounted() {
    await this.gameStore.hydrateGame(this.$route.params.id as string)
    await webService.connectToGame(this.$route.params.id as string)

    const pixiDiv = this.$refs.pixi as HTMLDivElement
    const pixiCanvas = app.view as HTMLCanvasElement
    pixiDiv.appendChild(pixiCanvas)

    this.gameStore.systems.forEach((system) => {
      createSystemSprite(system).then((sprite) => board.addChild(sprite))
    })

    pixiDiv.addEventListener('mousedown', this.handleMouseEvent)
    pixiDiv.addEventListener('mouseup', this.handleMouseEvent)
    pixiDiv.addEventListener('mousemove', this.handleMouseEvent)
    pixiDiv.addEventListener('contextmenu', (ev) => ev.preventDefault())

    window.addEventListener('wheel', handleWheelEvent)
  },
  unmounted() {
    window.removeEventListener('wheel', handleWheelEvent)
  },
  data: () => ({
    canvas: null as CanvasRenderingContext2D | null,
    mouseDown: false,
    strategySelection: false,
  }),
  methods: {
    handleMouseEvent(event: MouseEvent) {
      if (event.type === 'mousedown' && event.button == 2) {
        this.mouseDown = true
      } else if (event.type === 'mouseup' && event.button == 2) {
        this.mouseDown = false
      } else if (event.type === 'mousemove' && this.mouseDown) {
        board.x += event.movementX
        board.y += event.movementY
      }
    },
  },
})
</script>

<style scoped>
.player-overlay {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>

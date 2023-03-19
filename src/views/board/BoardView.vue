<template>
  <strategy-selection-overlay v-model="strategySelection" v-if="gameStore.phase === 'strategy'" />
  <div id="pixiCanvas" ref="pixi" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Assets, Container, Sprite } from 'pixi.js'
import { hexToPoint } from '../../services/hex-service'
import { app, handleWheelEvent, colorFilters } from '../../services/graphics-service'
import { useGameStore } from '../../stores/game'
import StrategySelectionOverlay from '../../components/overlays/StrategySelectionOverlay.vue'
import * as webService from '../../services/web-service/index'

export default defineComponent({
  name: 'BoardView',
  components: { StrategySelectionOverlay },
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
    const scaleFactor = 3.6

    const container = new Container()
    app.stage.addChild(container)

    this.gameStore.systems.forEach((system) => {
      Assets.load(`/img/systems/${String(system.id).padStart(2, '0')}.webp`).then((texture) => {
        const sprite = new Sprite(texture)
        sprite.scale.set(1 / scaleFactor, 1 / scaleFactor)
        const size = sprite.width / 2

        let point = hexToPoint(system.getHex())
        sprite.x = app.renderer.width / 2 + point.x * size
        sprite.y = app.renderer.height / 2 + point.y * size

        // Rotate around the center
        sprite.anchor.set(0.5, 0.5)

        // Add the sprite to the scene we are building
        container.addChild(sprite)

        system.units.forEach((unit, idx) => {
          Assets.load(`/img/units/${unit.type}.webp`).then((texture) => {
            const unitSprite = new Sprite(texture)
            unitSprite.scale.set(1.8 / scaleFactor, 1.8 / scaleFactor)

            if (unit.player?.color) unitSprite.filters = colorFilters(unit.player.color)

            unitSprite.x = sprite.x + Math.floor(idx / 3) * 50 - 50
            unitSprite.y = sprite.y + (idx % 3) * 50 - 50

            // Rotate around the center
            unitSprite.anchor.set(0.5, 0.5)

            // Add the sprite to the scene we are building
            container.addChild(unitSprite)
          })
        })
      })
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
        app.stage.x += event.movementX
        app.stage.y += event.movementY
      }
    },
  },
})
</script>

<style scoped></style>

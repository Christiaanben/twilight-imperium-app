<template>
  <div id="pixiCanvas" ref="pixi"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Assets, Container, Sprite } from 'pixi.js'
import { hexToPoint } from '../../services/hex-service'
import { app, handleWheelEvent } from '../../services/graphics-service'
import { useGameStore } from '../../stores/game'

export default defineComponent({
  name: 'BoardView',
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore,
    }
  },
  async mounted() {
    await this.gameStore.hydrateGame(this.$route.params.id as string)
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

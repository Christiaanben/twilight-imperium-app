<template>
  <div id="pixiCanvas" ref="pixi"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Assets, Sprite } from 'pixi.js'
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

    this.gameStore.systems.forEach((system) => {
      Assets.load(`/img/systems/${system.id}.webp`).then((texture) => {
        const sprite = new Sprite(texture)
        sprite.scale.set(1 / scaleFactor, 1 / scaleFactor)
        const size = sprite.width / 2

        let point = hexToPoint(system.getHex())
        sprite.x = app.renderer.width / 2 + point.x * size
        sprite.y = app.renderer.height / 2 + point.y * size

        // Rotate around the center
        sprite.anchor.set(0.5, 0.5)

        // Add the sprite to the scene we are building
        app.stage.addChild(sprite)
      })
    })

    window.addEventListener('wheel', handleWheelEvent)
  },
  unmounted() {
    window.removeEventListener('wheel', handleWheelEvent)
  },
  data: () => ({
    canvas: null as CanvasRenderingContext2D | null,
  }),
  methods: {},
})
</script>

<style scoped></style>

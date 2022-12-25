<template>
  <div id="pixiCanvas" ref="pixi"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Application, Assets, Sprite } from 'pixi.js'
import { hexToPoint } from '../../services/hex-service'
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
    const app = new Application({
      height: 990,
      width: 1920,
      backgroundColor: '0x080810',
    })
    const pixiDiv = this.$refs.pixi as HTMLDivElement
    const pixiCanvas = app.view as HTMLCanvasElement
    pixiDiv.appendChild(pixiCanvas)
    const scaleFactor = 1.8

    this.gameStore.systems.forEach((system) => {
      Assets.load(`/img/systems/${system.id}.png`).then((texture) => {
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
  },
  data: () => ({
    canvas: null as CanvasRenderingContext2D | null,
  }),
  methods: {
    drawHex() {},
  },
})
</script>

<style scoped></style>

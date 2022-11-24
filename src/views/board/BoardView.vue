<template>
  <div id="pixiCanvas" ref="pixi"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Application, Assets, Sprite } from 'pixi.js'
import { hexToPoint } from '../../services/hex-service'

export default defineComponent({
  name: 'BoardView',
  mounted() {
    const app = new Application()
    const pixiDiv = this.$refs.pixi as HTMLDivElement
    const pixiCanvas = app.view as HTMLCanvasElement
    pixiDiv.appendChild(pixiCanvas)
    Assets.load('/img/systems/18.png').then((texture) => {
      const sprite = new Sprite(texture)
      sprite.scale.set(0.5, 0.5)
      const size = sprite.width / 2

      let point = hexToPoint({ q: 0, r: 0 })
      sprite.x = app.renderer.width / 2 + point.x * size
      sprite.y = app.renderer.height / 2 + point.y * size

      // Rotate around the center
      sprite.anchor.set(0.5, 0.5)

      // Add the sprite to the scene we are building
      app.stage.addChild(sprite)
    })
    Assets.load('/img/systems/44.png').then((texture) => {
      const sprite = new Sprite(texture)
      sprite.scale.set(0.5, 0.5)
      sprite.anchor.set(0.5, 0.5)
      const size = sprite.width / 2

      let point = hexToPoint({ q: 1, r: -1 })
      sprite.x = app.renderer.width / 2 + point.x * size
      sprite.y = app.renderer.height / 2 + point.y * size

      app.stage.addChild(sprite)
    })
    Assets.load('/img/systems/48.png').then((texture) => {
      const sprite = new Sprite(texture)
      sprite.scale.set(0.5, 0.5)
      sprite.anchor.set(0.5, 0.5)
      const size = sprite.width / 2

      let point = hexToPoint({ q: 0, r: -1 })
      sprite.x = app.renderer.width / 2 + point.x * size
      sprite.y = app.renderer.height / 2 + point.y * size

      app.stage.addChild(sprite)
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

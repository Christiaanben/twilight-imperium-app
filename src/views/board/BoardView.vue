<template>
  <h3>Game Board</h3>
  <div id="pixiCanvas" ref="pixi"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Application, Assets, Sprite } from 'pixi.js'

export default defineComponent({
  name: 'BoardView',
  mounted() {
    const app = new Application()
    console.log(typeof this.$refs.pixi)
    const pixiDiv = this.$refs.pixi as HTMLDivElement
    const pixiCanvas = app.view as HTMLCanvasElement
    pixiDiv.appendChild(pixiCanvas)
    Assets.load('/concrete.png').then((texture) => {
      const sprite = new Sprite(texture)
      sprite.height /= 6
      sprite.width /= 6
      const size = sprite.width / 2

      let q = 0,
        r = 0
      sprite.x = app.renderer.width / 2 + (q * Math.sqrt(3) + (r * Math.sqrt(3)) / 2) * size
      sprite.y = app.renderer.height / 2 + ((r * 3) / 2) * size
      console.log('sprite 1', sprite.x, sprite.y)
      sprite.rotation += Math.PI / 2

      // Rotate around the center
      sprite.anchor.x = 0.5
      sprite.anchor.y = 0.5

      // Add the sprite to the scene we are building
      app.stage.addChild(sprite)

      const sprite2 = new Sprite(texture)
      q = 1
      r = 0
      sprite2.height /= 6
      sprite2.width /= 6
      sprite2.x = app.renderer.width / 2 + (q * Math.sqrt(3) + (r * Math.sqrt(3)) / 2) * size
      sprite2.y = app.renderer.height / 2 + ((r * 3) / 2) * size
      console.log('sprite 2', sprite2.x, sprite2.y)

      // Rotate around the center
      sprite2.anchor.x = 0.5
      sprite2.anchor.y = 0.5

      // Add the sprite to the scene we are building
      app.stage.addChild(sprite2)
      sprite2.rotation += Math.PI / 2
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

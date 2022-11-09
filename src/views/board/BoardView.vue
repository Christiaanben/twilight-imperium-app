<template>
  <h1>Game Board</h1>
  <canvas id="canvas"></canvas>
  <div>
    <button @click="drawHex">HEX</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {drawHexFromAxial} from "../../services/board";

export default defineComponent({
  name: "BoardView",
  mounted() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    this.canvas = canvas.getContext("2d")
  },
  data: () => ({
    canvas: null as CanvasRenderingContext2D|null,
  }),
  methods: {
    drawHex() {
      if(this.canvas) {
        const size = 25
        drawHexFromAxial(0, 0, size, this.canvas)

        drawHexFromAxial(0, 1, size, this.canvas)
        drawHexFromAxial(1, 0, size, this.canvas)
        drawHexFromAxial(1, -1, size, this.canvas)
        drawHexFromAxial(0, -1, size, this.canvas)
        drawHexFromAxial(-1, 0, size, this.canvas)
        drawHexFromAxial(-1, 1, size, this.canvas)

        drawHexFromAxial(2, 0, size, this.canvas)
        drawHexFromAxial(2, -2, size, this.canvas)
        drawHexFromAxial(0, -2, size, this.canvas)
      }
    },
  }
})
</script>

<style scoped>
#canvas{
  height: 300px;
  width: 300px;
}
</style>
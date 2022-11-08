<template>
  <h1>Game Board</h1>
  <canvas id="canvas"></canvas>
  <div>
    <button @click="drawRect">Add Rect</button>
    <button @click="subWidth">-</button>
    <button @click="addWidth">+</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "BoardView",
  mounted() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    this.canvas = canvas.getContext("2d")
    this.drawRect()
  },
  data: () => ({
    rectWidth: 50,
    canvas: null as CanvasRenderingContext2D|null,
  }),
  methods: {
    drawRect() {
      if(this.canvas===null)return
      // clear canvas
      this.canvas.clearRect(0, 0, 400, 200);

      // draw rect
      this.canvas.beginPath();
      this.canvas.rect(20, 20, this.rectWidth, 100);
      this.canvas.stroke();
    },
    addWidth() {
      this.rectWidth += 10
      this.drawRect()
    },
    subWidth() {
      this.rectWidth -= 10
      this.drawRect()
    }
  }
})
</script>

<style scoped>

</style>
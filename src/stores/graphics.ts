import { defineStore } from 'pinia'
import { Application } from 'pixi.js'

export const useGraphicsStore = defineStore('graphics', {
  state: () => ({
    app: new Application({
      width: window.innerWidth - 100,
      height: window.innerHeight,
      backgroundColor: '0x080810',
      resizeTo: window,
    }),
    zoomLevel: 1,
  }),
  actions: {
    handleMouseWheelEvent(event: WheelEvent) {
      if (event.deltaY !== 0) {
        const delta = event.deltaY / -100
        this.zoomLevel = Math.min(
          Math.max(Math.pow(1.05, -6), this.zoomLevel * Math.pow(1.05, delta)),
          Math.pow(1.05, 6)
        )
        this.app.stage.scale.set(this.zoomLevel, this.zoomLevel)
      }
    },
  },
})

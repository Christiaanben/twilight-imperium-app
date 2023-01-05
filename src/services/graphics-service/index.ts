import { Application } from 'pixi.js'

let zoomLevel = 1

export const app = new Application({
  width: window.innerWidth - 100,
  height: window.innerHeight,
  backgroundColor: '0x080810',
  resizeTo: window,
})

export function handleWheelEvent(event: WheelEvent) {
  if (event.deltaY !== 0) {
    const delta = event.deltaY / -100
    zoomLevel = Math.min(Math.max(Math.pow(1.05, -6), zoomLevel * Math.pow(1.05, delta)), Math.pow(1.05, 6))
    app.stage.scale.set(zoomLevel, zoomLevel)
  }
}

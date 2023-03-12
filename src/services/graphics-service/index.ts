import { Application } from 'pixi.js'

let zoomLevel = 1
const zoomDelta = 1.1

export const app = new Application({
  width: window.innerWidth - 100,
  height: window.innerHeight,
  backgroundColor: '0x080810',
  resizeTo: window,
})

export function handleWheelEvent(event: WheelEvent) {
  if (event.deltaY !== 0) {
    const delta = event.deltaY / -100
    const mousePos = { x: event.offsetX, y: event.offsetY }
    zoomLevel = Math.min(
      Math.max(Math.pow(zoomDelta, -8), zoomLevel * Math.pow(zoomDelta, delta)),
      Math.pow(zoomDelta, 8)
    )
    const scaleDiff = 1 / app.stage.scale.x - 1 / zoomLevel
    app.stage.pivot.set(app.stage.pivot.x + mousePos.x * scaleDiff, app.stage.pivot.y + mousePos.y * scaleDiff)
    app.stage.scale.set(zoomLevel, zoomLevel)
  }
}

import { Application } from 'pixi.js'
import { ColorMatrixFilter } from '@pixi/filter-color-matrix'
import { Color } from '../../interfaces/color'

let zoomLevel = 1
const zoomDelta = 1.1
const colorRGBByColor: Record<Color, number> = {
  red: 0xff0000,
  yellow: 0xffff00,
  green: 0x00ff00,
  black: 0x333333,
  blue: 0x0000ff,
  purple: 0xff00ff,
}

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

export function colorFilters(color: Color): ColorMatrixFilter[] {
  const filters = [new ColorMatrixFilter(), new ColorMatrixFilter()]
  filters[0].greyscale(0.5, false)
  filters[1].tint(colorRGBByColor[color], false)
  return filters
}

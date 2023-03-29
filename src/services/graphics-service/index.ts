import { Application, Assets, Sprite } from 'pixi.js'
import { ColorMatrixFilter } from '@pixi/filter-color-matrix'
import { Color } from '../../interfaces/color'
import { GlowFilter } from '@pixi/filter-glow'
import { System } from '../../models/system'
import { hexToPoint } from '../hex-service'
import { useGameStore } from '../../stores/game'
import { Unit } from '../../models/unit'
import { UNIT_TYPES } from '../../interfaces/unit-type'

const zoomDelta = 1.1
let zoomLevel = 1
const colorRGBByColor: Record<Color, number> = {
  red: 0xdd0000,
  yellow: 0xffdf33,
  green: 0x00aa00,
  black: 0x48494b,
  blue: 0x1133ff,
  purple: 0xaa00dd,
}

export const app = new Application({
  width: window.innerWidth - 100,
  height: window.innerHeight,
  backgroundColor: '0x080810',
  resizeTo: window,
})
app.stage.scale.set(zoomLevel, zoomLevel)

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

const handleSystemClick = (systemId: number) => {
  useGameStore().selectedSystemId = systemId
  console.log('Clicked on system', systemId)
}

const handleSystemMouseOut = (sprite: Sprite) => {
  sprite.filters = []
  sprite.zIndex = 0
  document.body.style.cursor = 'default'
}

const handleSystemMouseOver = (sprite: Sprite) => {
  sprite.filters = [
    new GlowFilter({
      distance: 15,
      outerStrength: 1,
      innerStrength: 1,
      color: 0x00ff00,
      quality: 0.3,
    }),
  ]
  sprite.zIndex = 1
  document.body.style.cursor = 'pointer'
}

Assets.addBundle(
  'systems',
  Object.fromEntries(
    [...Array(50).keys()].map((systemId) => [
      systemId + 1,
      `/img/systems/${String(systemId + 1).padStart(2, '0')}.webp`,
    ])
  )
)

const scaleFactor = 3.6
export const createSystemSprite = async (system: System) => {
  console.debug('[graphics] Creating sprite for system', system)
  const assets = await Assets.loadBundle('systems')
  const sprite = new Sprite(assets[system.id])

  sprite.scale.set(1 / scaleFactor, 1 / scaleFactor)

  const size = sprite.width / 2
  const point = hexToPoint(system.getHex())
  sprite.x = app.renderer.width / 2 + point.x * size
  sprite.y = app.renderer.height / 2 + point.y * size

  // Rotate around the center
  sprite.anchor.set(0.5, 0.5)

  // Attach listener to system
  sprite.eventMode = 'static'
  sprite.on('click', () => handleSystemClick(system.id))
  sprite.on('mouseover', () => handleSystemMouseOver(sprite))
  sprite.on('mouseout', () => handleSystemMouseOut(sprite))

  system.units.forEach((unit, idx) => {
    createUnitSprite(unit, sprite, idx)
  })

  return sprite
}

Assets.addBundle('units', Object.fromEntries(UNIT_TYPES.map((unitType) => [unitType, `/img/units/${unitType}.webp`])))
const createUnitSprite = async (unit: Unit, systemSprite: Sprite, index: number) => {
  const assets = await Assets.loadBundle('units')
  const unitSprite = new Sprite(assets[unit.type])
  unitSprite.scale.set(5 / scaleFactor, 5 / scaleFactor)

  if (unit.player?.color) unitSprite.filters = colorFilters(unit.player.color)

  unitSprite.x = Math.floor(index / 3) * 150 - 150
  unitSprite.y = (index % 3) * 150 - 150

  // Rotate around the center
  unitSprite.anchor.set(0.5, 0.5)

  systemSprite.addChild(unitSprite)
}

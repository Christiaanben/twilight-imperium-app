import type { System } from '../../models/system'
import type { SystemUnitCounts } from './interfaces'
import { UNIT_TYPES } from '../../interfaces/unit-type'

export function getUnitsCountsForSystem(system: System): SystemUnitCounts {
  const planetIds = ['space', ...system.planets.map((planet) => planet.id)]
  const unitCountsByPlanetIds = Object.fromEntries(
    planetIds.map((planetId) => [planetId, Object.fromEntries(UNIT_TYPES.map((unitType) => [unitType, 0]))])
  )
  system.units.forEach((unit) => {
    unitCountsByPlanetIds[unit.planetId || 'space'][unit.type] += 1
  })
  return unitCountsByPlanetIds as SystemUnitCounts
}

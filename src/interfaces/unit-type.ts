export const UNIT_TYPES = [
  'flagship',
  'war_sun',
  'dreadnought',
  'carrier',
  'cruiser',
  'destroyer',
  'fighter',
  'infantry',
  'pds',
  'space_dock',
] as const
export type UnitType = typeof UNIT_TYPES[number]

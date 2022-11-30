export const FACTIONS = ['bugs', 'humans', 'fish', 'lions'] as const
export type Faction = typeof FACTIONS[number]

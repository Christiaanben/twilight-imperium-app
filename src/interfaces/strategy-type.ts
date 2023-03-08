export const STRATEGY_TYPES = [
  'leadership',
  'diplomacy',
  'politics',
  'construction',
  'trade',
  'warfare',
  'technology',
  'imperial',
] as const
export type StrategyType = typeof STRATEGY_TYPES[number]

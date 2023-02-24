export const STRATEGIES = [
  'leadership',
  'diplomacy',
  'politics',
  'construction',
  'trade',
  'warfare',
  'technology',
  'imperial',
] as const
export type Strategy = typeof STRATEGIES[number]

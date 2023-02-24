export const PHASES = ['strategy', 'action', 'status', 'agenda'] as const
export type Phase = typeof PHASES[number]

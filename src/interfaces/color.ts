export const COLORS = ['red', 'yellow', 'green', 'black', 'blue', 'purple'] as const
export type Color = typeof COLORS[number]

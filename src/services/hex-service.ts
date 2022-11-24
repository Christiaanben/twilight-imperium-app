import type { Hex } from '../interfaces/hex'
import type { Point } from '../interfaces/point'

export function hexToPoint(hex: Hex): Point {
  return {
    x: 1.5 * hex.q,
    y: (Math.sqrt(3) / 2) * hex.q + Math.sqrt(3) * hex.r,
  }
}

import type { Hex } from '../interfaces/hex'

export class Tile {
  id: number
  q: number
  r: number

  constructor({ id = 0, q = 0, r = 0 } = {}) {
    this.id = id
    this.q = q
    this.r = r
  }

  getHex(): Hex {
    return { q: this.q, r: this.r }
  }
}

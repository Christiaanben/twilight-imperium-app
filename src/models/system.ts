import type { Hex } from '../interfaces/hex'
import { SystemResponse } from '../services/web-service/interfaces'

export class System {
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

  static fromJson(tileResponse: SystemResponse): System {
    return new System({
      id: tileResponse.id,
      q: tileResponse.q,
      r: tileResponse.r,
    })
  }
}

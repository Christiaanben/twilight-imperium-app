import type { Hex } from '../interfaces/hex'
import { SystemResponse } from '../services/web-service/interfaces'
import { Unit } from './unit'
import { useGameStore } from '../stores/game'
import { Player } from './player'
import { Planet } from './planet'

export class System {
  id: number
  q: number
  r: number
  activatedByIds: number[]
  planets: Planet[] = []

  constructor({ id = 0, q = 0, r = 0, activatedByIds = [] as number[], planets = [] as Planet[] } = {}) {
    this.id = id
    this.q = q
    this.r = r
    this.activatedByIds = activatedByIds
    this.planets = planets
  }

  getHex(): Hex {
    return { q: this.q, r: this.r }
  }

  get units(): Unit[] {
    return useGameStore().units.filter((unit) => unit.systemId === this.id)
  }

  get activatedBy(): Player[] {
    return useGameStore().players.filter((player) => this.activatedByIds.includes(player.id as number))
  }

  static fromJson(systemResponse: SystemResponse): System {
    return new System({
      id: systemResponse.id,
      q: systemResponse.q,
      r: systemResponse.r,
      activatedByIds: systemResponse.activated_by,
      planets: systemResponse.planets.map(Planet.fromJson),
    })
  }
}

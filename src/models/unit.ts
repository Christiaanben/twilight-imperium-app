import { UnitResponse } from '../services/web-service/interfaces'
import { UnitType } from '../interfaces/unit-type'
import { Player } from './player'
import { useGameStore } from '../stores/game'

export class Unit {
  systemId: number
  type: UnitType
  _player: number
  planetId: string | null = null

  constructor({ systemId = 0, type = 'flagship' as UnitType, player = 0, planetId = null as string | null } = {}) {
    this.systemId = systemId
    this.type = type
    this._player = player
    this.planetId = planetId
  }

  static fromJson(unitResponse: UnitResponse): Unit {
    return new Unit({
      systemId: unitResponse.system,
      type: unitResponse.type,
      player: unitResponse.owned_by,
      planetId: unitResponse.planet,
    })
  }

  get player(): Player | null {
    return useGameStore().getPlayerById(this._player)
  }
}

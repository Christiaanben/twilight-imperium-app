import type { Faction } from '../interfaces/faction'
import type { Color } from '../interfaces/color'
import * as webService from '../services/web-service'
import type { PlayerResponse } from '../services/web-service/interfaces'
import type { User } from '../interfaces/user'

export class Player {
  id: number | null
  _color: Color | null // removed private field. typescript both ignores and enforces the field when type checking, so it causes errors
  faction: Faction | null
  user: User | null

  constructor({
    id = null as null | number,
    faction = null as null | Faction,
    color = null,
    user = null as User | null,
  } = {}) {
    this.id = id
    this._color = color
    this.user = user
    this.faction = faction
  }

  get color(): Color | null {
    return this._color
  }

  set color(value: Color | null) {
    if (this._color !== value) {
      this._color = value
      webService.updatePlayer(this)
    }
  }

  static fromJson(playerResponse: PlayerResponse): Player {
    return new Player({
      id: playerResponse.id,
      color: playerResponse.color,
      user: playerResponse.user,
      faction: playerResponse.faction,
    })
  }

  toJson() {
    return {
      id: this.id,
      color: this.color,
    }
  }
}

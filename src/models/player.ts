import type { Faction } from '../interfaces/faction'
import type { Color } from '../interfaces/color'
import * as webService from '../services/web-service'
import type { PlayerResponse } from '../services/web-service/interfaces'
import type { User } from '../interfaces/user'

export class Player {
  id: number | null
  _color: Color | null // removed private field. typescript both ignores and enforces the field when type checking, so it causes errors
  _faction: Faction | null
  user: User | null
  _isReady: boolean

  constructor({
    id = null as null | number,
    faction = null as null | Faction,
    color = null,
    user = null as User | null,
    isReady = false,
  } = {}) {
    this.id = id
    this._color = color
    this._faction = faction
    this.user = user
    this._isReady = isReady
  }

  get faction(): Faction | null {
    return this._faction
  }

  set faction(value: Faction | null) {
    if (this._faction !== value) {
      this._faction = value
      webService.updatePlayer(this)
    }
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

  get isReady(): boolean {
    return this._isReady
  }

  set isReady(value: boolean) {
    if (this._isReady !== value) {
      this._isReady = value
      webService.updatePlayer(this)
    }
  }

  static fromJson(playerResponse: PlayerResponse): Player {
    return new Player({
      id: playerResponse.id,
      color: playerResponse.color,
      user: playerResponse.user,
      faction: playerResponse.faction,
      isReady: playerResponse.is_ready,
    })
  }

  toJson() {
    return {
      id: this.id,
      color: this.color,
      faction: this.faction,
      is_ready: this.isReady,
    }
  }
}

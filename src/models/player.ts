import type { Faction } from '../interfaces/faction'
import type { Color } from '../interfaces/color'
import * as webService from '../services/web-service'

export class Player {
  faction?: Faction
  private _color: Color | null

  constructor({ color = null } = {}) {
    this._color = color
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

  toJson() {
    return {
      color: this.color,
    }
  }
}

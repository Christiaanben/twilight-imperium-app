import type { Player } from './player'
import { useGameStore } from '../stores/game'
import { StrategyResponse } from '../services/web-service/interfaces'
import { StrategyType } from '../interfaces/strategy-type'

export class Strategy {
  private readonly playerId: number | null
  private readonly _initiative: number
  private readonly type: StrategyType

  constructor({ playerId = null as null | number, initiative = 0, type = 'leadership' as StrategyType } = {}) {
    this.playerId = playerId
    this._initiative = initiative
    this.type = type
  }

  get player(): Player | null {
    return this.playerId ? useGameStore().getPlayerById(this.playerId) : null
  }

  get initiative(): number {
    return this._initiative
  }

  static fromJson(strategyResponse: StrategyResponse): Strategy {
    return new Strategy({
      playerId: strategyResponse.player,
      type: strategyResponse.type,
      initiative: strategyResponse.initiative,
    })
  }
}

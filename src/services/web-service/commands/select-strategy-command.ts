import { useGameStore } from '../../../stores/game'
import type { StrategyResponse } from '../interfaces'
import { Strategy } from '../../../models/strategy'

export class SelectStrategyCommand {
  private readonly strategy: Strategy

  constructor(strategyResponse: StrategyResponse) {
    this.strategy = Strategy.fromJson(strategyResponse)
  }

  execute(): void {
    const gameStore = useGameStore()
    gameStore.strategies = [
      ...gameStore.strategies.filter((strategy) => strategy.initiative !== this.strategy.initiative),
      this.strategy,
    ]
  }
}

import { useGameStore } from '../../../stores/game'
import type { Strategy } from '../../../interfaces/strategy'

export class SelectStrategyCommand {
  private readonly type: string
  private readonly initiative: number

  constructor({ type = 'leadership' as Strategy, initiative = 0 } = {}) {
    this.type = type
    this.initiative = initiative
  }

  execute(): void {
    let gameStore = useGameStore()
    gameStore.strategies = [
      ...gameStore.strategies.filter((strategy) => strategy.type !== this.type),
      {
        type: this.type,
        initiative: this.initiative,
      },
    ]
  }
}

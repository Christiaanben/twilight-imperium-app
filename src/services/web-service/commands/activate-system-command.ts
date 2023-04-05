import { System } from '../../../models/system'
import { useGameStore } from '../../../stores/game'
import type { SystemResponse } from '../interfaces'

export class ActivateSystemCommand {
  private readonly system: System

  constructor(systemResponse: SystemResponse) {
    this.system = System.fromJson(systemResponse)
  }

  execute(): void {
    const gameStore = useGameStore()
    gameStore.systems = [...gameStore.systems.filter((system) => system.id !== this.system.id), this.system]
  }
}

import { useGameStore } from '../../../stores/game'
import type { PlayerResponse } from '../interfaces'
import { Player } from '../../../models/player'

export class UpdatePlayerCommand {
  private readonly player: Player

  constructor(playerResponse: PlayerResponse) {
    this.player = Player.fromJson(playerResponse)
  }

  execute(): void {
    const gameStore = useGameStore()
    gameStore.players = [...gameStore.players.filter((player) => player.id !== this.player.id), this.player]
  }
}

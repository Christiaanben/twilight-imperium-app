import { Player } from './player'

export class Lobby {
  id: string
  name: string
  players: Player[]

  constructor(id: string, name: string, players: Player[]) {
    this.id = id
    this.name = name
    this.players = players
  }

  addPlayer(playerName: string) {
    this.players.push(new Player())
  }
}

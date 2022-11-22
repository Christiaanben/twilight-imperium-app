export class Lobby {
  id: string
  name: string
  players: string[]

  constructor(id: string, name: string, players: string[]) {
    this.id = id
    this.name = name
    this.players = players
  }

  addPlayer(playerName: string) {
    this.players.push(playerName)
  }
}

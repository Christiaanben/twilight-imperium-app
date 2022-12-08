export interface PlayerResponse {
  id: number
  user: string
  color: null
  race: null
}

export interface PlayerEventInfo {
  player: PlayerResponse
}

export interface LobbyResponse {
  id: string
  name: string
  players: PlayerResponse[]
}

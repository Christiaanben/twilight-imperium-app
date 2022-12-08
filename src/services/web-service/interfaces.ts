export interface UserResponse {
  id: string
  email: string
}

export interface PlayerResponse {
  id: number
  user: UserResponse
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

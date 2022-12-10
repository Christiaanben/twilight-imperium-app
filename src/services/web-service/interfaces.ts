import type { Faction } from '../../interfaces/faction'

export interface UserResponse {
  id: string
  email: string
}

export interface PlayerResponse {
  id: number
  user: UserResponse
  color: null
  faction: Faction
}

export interface PlayerEventInfo {
  player: PlayerResponse
}

export interface LobbyResponse {
  id: string
  name: string
  players: PlayerResponse[]
}

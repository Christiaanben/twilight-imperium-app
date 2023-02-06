import {Faction} from "../../interfaces/faction";

export interface UserResponse {
  id: string
  email: string
  display_name: string
}

export interface PlayerResponse {
  id: number
  user: UserResponse
  color: null
  faction: Faction
  is_ready: boolean
}

export interface PlayerEventInfo {
  player: PlayerResponse
}

export interface LobbyResponse {
  id: string
  name: string
  players: PlayerResponse[]
}

export interface SystemResponse {
  id: number
  q: number
  r: number
}

export interface GameResponse {
  systems: SystemResponse[]
}

export interface AuthResponse {
  key: string
}

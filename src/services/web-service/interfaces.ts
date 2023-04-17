import { Phase } from '../../interfaces/phase'
import { StrategyType } from '../../interfaces/strategy-type'
import { UnitType } from '../../interfaces/unit-type'

export interface UserResponse {
  id: string
  email: string
  display_name: string
}

export interface PlayerResponse {
  id: number
  user: UserResponse
  color: null
  faction: string
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

export interface PlanetResponse {
  id: string
  name: string
  influence: number
  resource: number
}

export interface SystemResponse {
  id: number
  q: number
  r: number
  activated_by: number[]
  planets: PlanetResponse[]
}

export interface StrategyResponse {
  type: StrategyType
  initiative: number
  player: number | null
}

export interface UnitResponse {
  system: number
  type: UnitType
  owned_by: number
}

export interface GameResponse {
  systems: SystemResponse[]
  strategies: StrategyResponse[]
  players: PlayerResponse[]
  phase: Phase
  units: UnitResponse[]
}

export interface AuthResponse {
  key: string
}

export interface FactionResponse {
  id: string
  name: string
}

export interface FactionListResponse {
  count: number
  next: null
  previous: null
  results: FactionResponse[]
}

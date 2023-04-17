import { Phase } from '../../interfaces/phase'
import { StrategyType } from '../../interfaces/strategy-type'
import { UnitType } from '../../interfaces/unit-type'
import {CardType} from "../../interfaces/card-type";

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

export interface SystemResponse {
  id: number
  q: number
  r: number
  activated_by: number[]
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

export interface CardResponse{
  name: string
  type: CardType
  victory_points: number
}

export interface GameResponse {
  systems: SystemResponse[]
  strategies: StrategyResponse[]
  players: PlayerResponse[]
  phase: Phase
  units: UnitResponse[]

  cards: CardResponse[]
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

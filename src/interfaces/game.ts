import type { System } from '../models/system'
import type { Phase } from './phase'
import type { Strategy } from '../models/strategy'
import { Player } from '../models/player'
import { Unit } from '../models/unit'
import {Card} from "../models/card";

export interface Game {
  systems: System[]
  phase: Phase
  strategies: Strategy[]
  players: Player[]
  units: Unit[]

  cards: Card[]
}

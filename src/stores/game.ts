import { defineStore } from 'pinia'
import { System } from '../models/system'
import router from '../plugins/router'
import { fetchGame } from '../services/web-service'
import type { Phase } from '../interfaces/phase'
import type { StrategyType } from '../interfaces/strategy-type'
import * as webService from '../services/web-service/index'
import { Player } from '../models/player'
import { Strategy } from '../models/strategy'
import { Unit } from '../models/unit'

export const useGameStore = defineStore('game', {
  state: () => ({
    systems: [] as System[],
    strategies: [] as Strategy[],
    players: [] as Player[],
    phase: 'strategy' as Phase,
    units: [] as Unit[],
  }),
  getters: {
    getStrategies: (state) => {
      return state.strategies.sort((a, b) => a.initiative - b.initiative)
    },
    getPlayerById:
      (state) =>
      (id: number): Player | null => {
        return state.players.find((player) => player.id === id) || null
      },
  },
  actions: {
    async hydrateGame(gameId: string) {
      let { systems, phase, strategies, players, units } = await fetchGame(gameId)
      this.systems = systems
      this.strategies = strategies
      this.phase = phase
      this.players = players
      this.units = units
    },
    switchToGame(gameId: string) {
      router.push({ name: 'game', params: { id: gameId } })
    },
    selectStrategy(strategy: StrategyType) {
      console.debug(`gameStore.selectStrategy strategy:${strategy}`)
      webService.selectStrategy(strategy)
    },
  },
})

import { defineStore } from 'pinia'
import { System } from '../models/system'
import router from '../plugins/router'
import { fetchGame } from '../services/web-service'
import type { Phase } from '../interfaces/phase'
import type { Strategy } from '../interfaces/strategy'
import * as webService from '../services/web-service/index'

export const useGameStore = defineStore('game', {
  state: () => ({
    systems: [] as System[],
    strategies: [] as any[],
    phase: 'strategy' as Phase,
  }),
  actions: {
    async hydrateGame(gameId: string) {
      let { systems, phase, strategies } = await fetchGame(gameId)
      this.systems = systems
      this.strategies = strategies
      this.phase = phase
    },
    switchToGame(gameId: string) {
      router.push({ name: 'game', params: { id: gameId } })
    },
    selectStrategy(strategy: Strategy) {
      console.debug(`gameStore.selectStrategy strategy:${strategy}`)
      webService.selectStrategy(strategy)
    },
  },
})

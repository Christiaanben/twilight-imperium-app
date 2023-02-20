import { defineStore } from 'pinia'
import { System } from '../models/system'
import router from '../plugins/router'
import { fetchGame } from '../services/web-service'
import type { Phase } from '../interfaces/phase'

export const useGameStore = defineStore('game', {
  state: () => ({
    systems: [] as System[],
    phase: 'strategy' as Phase,
  }),
  actions: {
    async hydrateGame(gameId: string) {
      this.systems = await fetchGame(gameId)
    },
    switchToGame(gameId: string) {
      router.push({ name: 'game', params: { id: gameId } })
    },
  },
})

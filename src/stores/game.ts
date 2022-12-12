import { defineStore } from 'pinia'
import { Tile } from '../models/tile'
import { fetchGame } from '../services/web-service'

export const useGameStore = defineStore('game', {
  state: () => ({
    tiles: [
      new Tile({ id: 18, q: 0, r: 0 }),
      new Tile({ id: 44, q: 1, r: -1 }),
      new Tile({ id: 48, q: 0, r: -1 }),
      new Tile({ id: 45, q: -1, r: 0 }),
      new Tile({ id: 28, q: -1, r: 1 }),
      new Tile({ id: 42, q: 0, r: 1 }),
      new Tile({ id: 38, q: 1, r: 0 }),
    ],
  }),
  actions: {
    hydrateGame(gameId: string) {
      fetchGame(gameId).then((response) => console.log('response', response))
    },
  },
})

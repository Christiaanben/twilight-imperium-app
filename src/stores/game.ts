import { defineStore } from 'pinia'
import * as webService from '../services/web-service'

export const useGameStore = defineStore('game', {
  state: () => ({
    lobbyId: null as string | null,
  }),
  actions: {
    async createLobby() {
      await webService.createLobby('COOLIES').then((value) => {
        console.log('value', value)
        this.lobbyId = value['id']
      })
    },
  },
})

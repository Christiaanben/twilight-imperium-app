import { defineStore } from 'pinia'
import * as webService from '../services/web-service'

export const useGameStore = defineStore('game', {
  state: () => ({
    lobbyId: null as string | null,
  }),
  actions: {
    async createLobby(lobbyName: string) {
      await webService.createLobby(lobbyName).then((value) => {
        console.log('value', value)
        this.lobbyId = value['id']
      })
    },
    connectWS() {
      if (this.lobbyId !== null) webService.connect(this.lobbyId)
      else console.warn("Can't connect. No lobbyId")
    },
  },
})

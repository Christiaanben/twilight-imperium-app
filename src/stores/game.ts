import { defineStore } from 'pinia'
import * as webService from '../services/web-service'
import { Lobby } from '../models/lobby'
import { Player } from '../models/player'

export const useGameStore = defineStore('game', {
  state: () => ({
    lobby: null as Lobby | null,
  }),
  actions: {
    async fetchLobby(lobbyId: string) {
      this.lobby = await webService.fetchLobby(lobbyId)
    },
    async createLobby(lobbyName: string) {
      await webService.createLobby(lobbyName).then((value) => {
        this.lobby = new Lobby(value['id'], lobbyName, [])
      })
    },
    connectWS() {
      const lobbyId = this.lobby?.id
      if (lobbyId !== undefined) webService.connect(lobbyId)
      else console.warn("Can't connect. No lobbyId")
    },
    handleNewPlayerEvent() {
      console.debug('handleNewPlayerEvent')
      if (this.lobby) this.lobby.players.push(new Player())
    },
  },
})

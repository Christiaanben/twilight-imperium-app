import { defineStore } from 'pinia'
import * as webService from '../services/web-service'
import { Lobby } from '../models/lobby'
import { Player } from '../models/player'

export const useGameStore = defineStore('game', {
  state: () => ({
    lobbyId: null as string | null,
    lobby: null as Lobby | null,
  }),
  actions: {
    async createLobby(lobbyName: string) {
      await webService.createLobby(lobbyName).then((value) => {
        this.lobbyId = value['id']
        this.lobby = new Lobby(value['id'], lobbyName, [])
      })
    },
    connectWS() {
      if (this.lobbyId !== null) webService.connect(this.lobbyId)
      else console.warn("Can't connect. No lobbyId")
    },
    handleNewPlayerEvent() {
      console.debug('handleNewPlayerEvent')
      if (this.lobby) this.lobby.players.push(new Player())
    },
  },
})

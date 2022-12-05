import { defineStore } from 'pinia'
import * as webService from '../services/web-service'
import { Lobby } from '../models/lobby'
import { Player } from '../models/player'
import { UseWebSocketReturn } from '@vueuse/core'
import { Ref } from 'vue'
import { PlayerEventInfo } from '../services/web-service/interfaces'

export const useLobbyStore = defineStore('lobby', {
  state: () => ({
    lobby: null as Lobby | null,
    ws: null as Ref<UseWebSocketReturn<any>> | null,
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
      if (lobbyId !== undefined) this.ws = webService.connect(lobbyId)
      else console.warn("Can't connect. No lobbyId")
    },
    handleNewPlayerEvent(data: PlayerEventInfo) {
      console.debug('handleNewPlayerEvent', data)
      if (this.lobby) this.lobby.players.push(new Player())
    },
    handleUpdatePlayerEvent(data: PlayerEventInfo) {
      console.debug('handleUpdatePlayerEvent', data)
      if (this.lobby) {
        this.lobby.players = this.lobby.players.map((player) => {
          if (data.player.id == player.id) return Player.fromJson(data.player)
          return player
        })
      }
    },
  },
})

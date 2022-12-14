import { useWebSocket } from '@vueuse/core'
import axios, { AxiosResponse } from 'axios'
import { NEW_GAME, NEW_PLAYER, UPDATE_PLAYER } from './web-service/constants'
import { useLobbyStore } from '../stores/lobby'
import { Lobby } from '../models/lobby'
import type { GameResponse, LobbyResponse } from './web-service/interfaces'
import { Player } from '../models/player'
import { useAuthStore } from '../stores/auth'
import { System } from '../models/system'
import { useGameStore } from '../stores/game'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_WEB_URL,
})

export function createLobby(lobbyName: string): Promise<Record<string, string>> {
  return axiosClient
    .post('/api/lobbies/', {
      name: lobbyName,
    })
    .then((response) => response.data)
}

export function fetchLobby(lobbyId: string): Promise<Lobby> {
  return axiosClient.get(`/api/lobbies/${lobbyId}/`).then((response: AxiosResponse<LobbyResponse>) => {
    const players = response.data.players.map((playerResponse) => Player.fromJson(playerResponse))
    return new Lobby(response.data.id, response.data.name, players)
  })
}

export function connect(lobbyId: string) {
  return useWebSocket(`${import.meta.env.VITE_WEB_WS}/ws/lobby/${lobbyId}/?token=${useAuthStore().token}`, {
    onConnected() {
      console.log('[websocket] connected')
    },
    onMessage(ws, event) {
      const data = JSON.parse(event.data)
      console.log('[websocket][event]', data)
      if (data.type === NEW_PLAYER) useLobbyStore().handleNewPlayerEvent(data.kwargs)
      if (data.type === UPDATE_PLAYER) useLobbyStore().handleUpdatePlayerEvent(data.kwargs)
      if (data.type === NEW_GAME) useGameStore().switchToGame(lobbyId)
    },
  })
}

export function updatePlayer(player: Player) {
  useLobbyStore().ws?.send(
    JSON.stringify({
      type: 'update_player',
      kwargs: {
        player: player.toJson(),
      },
    })
  )
}

export function fetchGame(gameId: string) {
  return axiosClient.get(`/api/games/${gameId}/`).then((response: AxiosResponse<GameResponse>) => {
    return response.data.systems.map((systemResponse) => System.fromJson(systemResponse))
  })
}

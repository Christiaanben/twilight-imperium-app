import { useWebSocket } from '@vueuse/core'
import axios, { AxiosResponse } from 'axios'
import { NEW_PLAYER } from './web-service/constants'
import { useGameStore } from '../stores/game'
import { Lobby } from '../models/lobby'
import type { LobbyResponse } from './web-service/interfaces'

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
    return new Lobby(response.data.id, response.data.name, [])
  })
}

export function connect(lobbyId: string) {
  const { status, data, send, open, close } = useWebSocket(`${import.meta.env.VITE_WEB_WS}/ws/game/${lobbyId}/`, {
    onConnected() {
      console.log('[websocket] connected')
    },
    onMessage(ws, event) {
      const data = JSON.parse(event.data)
      console.log('[websocket][event]', data)
      if (data.event === NEW_PLAYER) useGameStore().handleNewPlayerEvent()
    },
  })
}

import { useWebSocket } from '@vueuse/core'
import axios from 'axios'
import { NEW_PLAYER } from './web-service/constants'
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

export function connect(lobbyId: string) {
  const { status, data, send, open, close } = useWebSocket(`${import.meta.env.VITE_WEB_WS}/ws/game/${lobbyId}/`, {
    onConnected() {
      console.log('I just connected!')
    },
    onMessage(ws, event) {
      const data = JSON.parse(event.data)
      console.log('new event on ws:', data)
      if (data.event === NEW_PLAYER) useGameStore().handleNewPlayerEvent()
    },
  })
}

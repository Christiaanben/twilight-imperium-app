import { useWebSocket } from '@vueuse/core'
import axios from 'axios'

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
      console.log('new message on ws:', event)
    },
  })
}

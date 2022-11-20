import { useWebSocket } from '@vueuse/core'
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
})

export function createLobby(lobbyName: string): Promise<Record<string, string>> {
  return axiosClient
    .post('/api/lobbies/', {
      name: lobbyName,
    })
    .then((response) => response.data)
}

export function connect(lobbyId: string) {
  const { status, data, send, open, close } = useWebSocket(`ws://localhost:8000/ws/game/${lobbyId}/`, {
    onConnected() {
      console.log('I just connected!')
    },
  })
}

import { useWebSocket, UseWebSocketReturn } from '@vueuse/core'
import { useAuthStore } from '../../stores/auth'
import { Strategy } from '../../interfaces/strategy'

let socket: UseWebSocketReturn<any> | null = null

export async function connectToGame(gameId: string) {
  socket = useWebSocket(`${import.meta.env.VITE_WEB_WS}/ws/game/${gameId}/?token=${useAuthStore().token}`, {
    autoReconnect: true,
  })
}

export function selectStrategy(strategy: Strategy) {
  socket?.send(
    JSON.stringify({
      type: 'select_strategy',
      kwargs: {
        strategy: strategy,
      },
    })
  )
}

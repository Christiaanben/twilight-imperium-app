import { useWebSocket, UseWebSocketReturn } from '@vueuse/core'
import { useAuthStore } from '../../stores/auth'
import { Strategy } from '../../interfaces/strategy'
import { useGameStore } from '../../stores/game'

let socket: UseWebSocketReturn<any> | null = null

export async function connectToGame(gameId: string) {
  socket = useWebSocket(`${import.meta.env.VITE_WEB_WS}/ws/game/${gameId}/?token=${useAuthStore().token}`, {
    autoReconnect: true,
    onMessage(ws, event) {
      const data = JSON.parse(event.data)
      console.debug(`[websocket][event:${data.type}]`, data)
      switch (data.type) {
        case 'select_strategy':
          let replaced = false
          useGameStore().strategies.map((strategy) => {
            if (data.kwargs.type === strategy.type) replaced = true
            return strategy
          })
          if (!replaced) useGameStore().strategies.push(data.kwargs)
      }
    },
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

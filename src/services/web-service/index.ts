import { useWebSocket, UseWebSocketReturn } from '@vueuse/core'
import { useAuthStore } from '../../stores/auth'
import { Strategy } from '../../interfaces/strategy'
import { COMMANDS } from './commands'

let socket: UseWebSocketReturn<any> | null = null

export async function connectToGame(gameId: string) {
  socket = useWebSocket(`${import.meta.env.VITE_WEB_WS}/ws/game/${gameId}/?token=${useAuthStore().token}`, {
    autoReconnect: true,
    onMessage(ws, event) {
      const data = JSON.parse(event.data)
      console.debug(`[websocket][event:${data.type}]`, data)
      let command_class = COMMANDS[data.type]
      let command = new command_class(data.kwargs)
      console.debug('[command]', command)
      command.execute()
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

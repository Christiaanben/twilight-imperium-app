import { SelectStrategyCommand } from './select-strategy-command'
import { ActivateSystemCommand } from './activate-system-command'
import type { Command } from './command'
import { UpdatePlayerCommand } from './update-player-command'

export const COMMANDS: Record<string, { new (Object: any): Command }> = {
  select_strategy: SelectStrategyCommand,
  activate_system: ActivateSystemCommand,
  update_player: UpdatePlayerCommand,
}

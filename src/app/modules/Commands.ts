import { Command } from '@common/classes/Command'
import { ICommand } from '@common/interfaces/ICommand'
import { InteractionEventType, InteractionEvents } from '@common/types/Event'

const tempConfig: {[key in InteractionEventType]?: {[key: string]: string} } = {
  [InteractionEventType.keyup]: {
    'd': 'stop_go_right',
    'a': 'stop_go_left'
  },
  [InteractionEventType.keydown]: {
    'd': 'start_go_right',
    'a': 'start_go_left',
    ' ': 'jump'
  }
}

export enum Keys {
 game = 'game'
}

const subscribers: {[key in Keys]: ((commands: ICommand[]) => void)[]} = {
  [Keys.game]: []
}

export function subscribe(key: Keys, callback: () => void) {
  subscribers[key].push(callback)
}

export function unsubscribe(key: Keys, callback: () => void) {
  subscribers[key] = subscribers[key].filter(item => item !== callback)
}

export function apply(events: InteractionEvents) {
  const gameCommands = getGameCommands(events)
  subscribers[Keys.game].forEach(item => item(gameCommands))
}

function getGameCommands(events: InteractionEvents): ICommand[] {
  const result: ICommand[] = []
  events.keyboard.forEach(item => {
    const command = tempConfig[item.type]?.[item.data]
    if(command) {
      result.push(new Command(command))
    }
  })
  return result
}

function getMenuCommands() {

}
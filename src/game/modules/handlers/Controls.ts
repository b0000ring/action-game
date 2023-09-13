import { ICommand } from '@common/interfaces/ICommand'

let subscribers: ((commands: ICommand[]) => void)[] = []

export function apply(commands: ICommand[]) {
  subscribers.forEach(item => item(commands))
}

export function subscribe(cb: (commands: ICommand[]) => void) {
  subscribers.push(cb)
}

export function unsubscribe(cb: (commands: ICommand[]) => void) {
  subscribers = subscribers.filter(item => item !== cb)
}


import { Actor } from '@common/types/Actor'

let subscribers: (() => Actor)[] = []

export function get(): Actor[] {
  return subscribers.map(item => item())
}

export function subscribe(getData: () => Actor) {
  subscribers.push(getData)
}

export function unsubscribe(actor: () => Actor) {
  subscribers = subscribers.filter(item => item !== actor)
}


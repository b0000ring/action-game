let subscribers: (() => void)[] = []

export function apply() {
  subscribers.forEach(item => item())
}

export function subscribe(cb: () => void) {
  subscribers.push(cb)
}

export function unsubscribe(cb: () => void) {
  subscribers = subscribers.filter(item => item !== cb)
}


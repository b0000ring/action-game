import { Actor } from '@common/types/Actor'

let subscribers: {
  getData: () => Actor
  cb: (direction: string) => void
}[] = []

export function apply() {
  const items = [...subscribers]

  while(items.length) {
    const item = items.shift()
    const data = item?.getData()
   
    if(!data) return

    items.forEach(next => {
      const nextData = next.getData()
      if (
        data.x < nextData.x + nextData.width &&
        data.x + data.width > nextData.x &&
        data.y < nextData.y + nextData.height &&
        data.y + data.height > nextData.y
      ) {
        if((data.y + data.height) <= (nextData.y + nextData.height)) {
          item?.cb('down')
        }
      }
    })
  }
}

export function subscribe(getData: () => Actor, cb: (direction: string) => void) {
  subscribers.push({
    getData,
    cb
  })
}

export function unsubscribe(cb: (direction: string) => void) {
  subscribers = subscribers.filter(item => item.cb !== cb)
}


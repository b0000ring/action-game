import { Actor } from '@common/types/Actor'

let colliding: {
  getData: () => Actor
  cb: (direction: string) => void
}[] = []

let collided: {
  getData: () => Actor
  cb: (direction: string) => void
}[] = []

export function apply() {
  colliding.forEach((item) => {
    const data = item.getData()

    collided.forEach(target => {
      const targetData = target.getData()

      if (
        data.x < targetData.x + targetData.width &&
        data.x + data.width > targetData.x &&
        data.y < targetData.y + targetData.height &&
        data.y + data.height > targetData.y
      ) {
        if((data.y + data.height) <= (targetData.y + targetData.height / 2)) {
          item.cb('down')
          return
        }
        if((data.y) >= (targetData.y + targetData.height / 2)) {
          item.cb('up')
          return
        }
        if((data.x + data.width) <= (targetData.x + targetData.width / 2)) {
          item.cb('right')
          return
        }
        if((data.x) >= (targetData.x + targetData.width / 2)) {
          item.cb('left')
          return
        }
      }
    })
  })
}

export function subscribeCollided(getData: () => Actor, cb: (direction: string) => void) {
  collided.push({
    getData,
    cb
  })
}

export function unsubscribeCollided(cb: (direction: string) => void) {
  collided = collided.filter(item => item.cb !== cb)
}

export function subscribeColliding(getData: () => Actor, cb: (direction: string) => void) {
  colliding.push({
    getData,
    cb
  })
}

export function unsubscribeColliding(cb: (direction: string) => void) {
  colliding = colliding.filter(item => item.cb !== cb)
}


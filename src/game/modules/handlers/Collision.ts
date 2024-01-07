import { Actor } from '@common/types/Actor'

let colliding: {
  previousData: Actor,
  getData: () => Actor
  cb: (direction: string, data: {x: number, y: number}) => void
}[] = []

let collided: {
  previousData: Actor,
  getData: () => Actor
  cb: (direction: string) => void
}[] = []

// TODO refactor
export function apply() {
  colliding.forEach((item) => {
    const data = item.getData()
    const previousData = item.previousData
    const x = previousData.x
    const y = previousData.y
    const width = data.width + data.x - previousData.x
    const height = data.height + data.y - previousData.y

    item.previousData = data

    collided.forEach(target => {
      const targetData = target.getData()
      const targetPreviousData = target.previousData
      const targetx = targetPreviousData.x
      const targety = targetPreviousData.y
      const targetWidth = targetData.width + targetData.x - targetPreviousData.x
      const targetHeight = targetData.height + targetData.y - targetPreviousData.y

      if(data.modificators.id === targetData.modificators.id) return

      if (
        x < targetx + targetWidth &&
        x + width > targetx &&
        y < targety + targetHeight &&
        y + height > targety
      ) {
        if((y + height) <= (targety + targetHeight / 2)) {
          item.cb('down', {x: 0, y: ((data.y + data.height - targetData.y) * -1) + 1})
          target.cb('up')
          return
        }
        if((y) >= (targety + targetHeight / 2)) {
          item.cb('up', {x: 0, y: targetData.y + targetData.height - data.y})
          target.cb('down')
          return
        }
        if((x + width) <= (targetx + targetWidth / 2)) {
          item.cb('right', {x: (data.x + data.width - targetData.x) * -1, y: 0})
          target.cb('left')
          return
        }
        if((x) >= (targetx + targetWidth / 2)) {
          item.cb('left', {x: targetData.x + targetData.width - data.x, y: 0})
          target.cb('right')
          return
        }
      }
    })
  })

  collided.forEach(item => item.previousData = item.getData())
}

export function subscribeCollided(getData: () => Actor, cb: (direction: string) => void) {
  collided.push({
    previousData: getData(),
    getData,
    cb
  })
}

export function unsubscribeCollided(cb: (direction: string) => void) {
  collided = collided.filter(item => item.cb !== cb)
}

export function subscribeColliding(getData: () => Actor, cb: (direction: string, data: {x: number, y: number}) => void) {
  colliding.push({
    previousData: getData(),
    getData,
    cb
  })
}

export function unsubscribeColliding(cb: (direction: string, data: {x: number, y: number}) => void) {
  colliding = colliding.filter(item => item.cb !== cb)
}
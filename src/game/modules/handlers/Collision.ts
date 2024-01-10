import { Actor } from '@common/types/Actor'

let collided: {
  previousData: Actor,
  getData: () => Actor
  cb: (direction: string) => void
}[] = []

// TODO refactor
// fix codestyle
// reduce x overlap max value
function apply(data: Actor, cb: (direction: string, data: {x: number, y: number}) => void) {
    let speedx = 0, speedy = 0

    if(data.modificators.speed) {
      speedx = data.modificators.speed.speedx
      speedy = data.modificators.speed.speedy
    }
  
    const x = data.x - speedx
    const y = data.y - speedy
    const width = data.width + data.x - x
    const height = data.height + data.y - y

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

        // Calculate the differences in position and size
        const dx = (x + width / 2) - (targetx + targetWidth / 2);
        const dy = (y + height / 2) - (targety + targetHeight / 2);

        const totalWidth = (width + targetWidth) / 2;
        const totalHeight = (height + targetHeight) / 2;

        // Calculate the overlap on each axis
        const overlapX = totalWidth - Math.abs(dx);
        const overlapY = totalHeight - Math.abs(dy);

        // Determine the collision side based on the minimum overlap
        if (overlapX >= overlapY - 1 ) {
            if (dy > 0) {
              cb('up', {x: 0, y: targetData.y + targetData.height - data.y})
              target.cb('down')
              return
            } else {
              const offset = overlapY * -1 + 0.5
              cb('down', {x: 0, y: overlapY > 0.6 ? offset : 0})
              target.cb('up')
              return
            }
        } else {
            if (dx > 0) {
              const offset = overlapX - 0.1
              cb('left', {x: overlapX > 0 && overlapX < 0.2 ? offset : 0, y: 0})
              target.cb('right')
              return
            } else {
              const offset = overlapX * -1 + 0.1
              cb('right', {x: overlapX < 0 && overlapX > -0.2 ? offset : 0, y: 0})
              target.cb('left')
              return
            }
        }
      }
    })
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

export function checkCollisions(data: Actor, cb: (direction: string, data: {x: number, y: number}) => void) {
  apply(data, cb)
}

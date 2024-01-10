import { Effect } from '@common/types/Effect'
import { IModificator } from '@game/interfaces/IModificator'

export class Moveable implements IModificator {
  private move: (x: number, y: number) => void
  private speed: {speedx: number, speedy: number} = {speedx: 0, speedy: 0}

  constructor(move: (x: number, y: number) => void) {
    this.move = move
  }

  get state() {
    return {
      speed: this.speed
    }
  }

  destroy() {}

  apply(effects: Effect[]) {
    // TODO refactor
    const collisions = {
      up: false,
      down: false,
      right: false,
      left: false
    }

    let speedx = 0
    let speedy = 0

    effects.filter(item => item.type === 'collision')
      .forEach(item => {
        if(item.direction === 'up') collisions.up = true
        if(item.direction === 'down') collisions.down = true
        if(item.direction === 'left') collisions.left = true
        if(item.direction === 'right') collisions.right = true
      })
        
    effects.filter(item => item.type === 'move')
      .forEach(item => {
        // TODO fix type
        if(item.x !== undefined && item.y !== undefined) {
          let newX = item.x
          let newY = item.y

          
          if(collisions.down && newY > 0) {
            newY = 0
          }
          if(collisions.right && newX > 0) {
            newX = 0
          }
          if(collisions.left && newX < 0) {
            newX = 0
          }
          if(collisions.up && newY < 0) {
            newY = 0
          }

          speedx += newX
          speedy += newY
        
          this.move(newX, newY)
        }
      })
  
    this.speed = {speedx, speedy}
  }
}
import { Effect } from '@common/types/Effect'
import { IModificator } from '@game/interfaces/IModificator'

const MAX_SPEED = 2

export class Moveable implements IModificator {
  private _move: (x: number, y: number) => void
  private speedx: number = 0

  constructor(move: (x: number, y: number) => void) {
    this._move = move
  }

  destroy() {
    
  }

  apply(effects: Effect[]) {
    const collisions = effects.filter(item => item.type === 'collision')
    let foundMoveX = false
    effects.forEach(item => {
      // TODO fix type
      if((item.type === 'move' || item.type === 'collision') && item.x !== undefined && item.y !== undefined) {
        let newX = item.x + this.speedx * Math.sign(item.x)
        let newY = item.y

        collisions.forEach(item => {
          if(item.direction === 'down' && newY > 0) {
            newY = 0
          }
          if(item.direction === 'right' && newX > 0) {
            newX = 0
          }
          if(item.direction === 'left' && newX < 0) {
            newX = 0
          }
          if(item.direction === 'up' && newY < 0) {
            newY = 0
          }
        })

        if(newX) {
          if(this.speedx < MAX_SPEED) {
            this.speedx += 0.05
          }
          foundMoveX = true
        }

        this._move(newX, newY)
      }
    })

    if(!foundMoveX) {
      this.speedx = 0
    } 
  }
}
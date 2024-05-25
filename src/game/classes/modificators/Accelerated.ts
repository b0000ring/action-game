import { Effect } from '@common/types/Effect'
import { IEffect } from '@game/interfaces/IEffect'
import { IModificator } from '@game/interfaces/IModificator'
import { Move } from '../effects/Move'

const MAX_ACCELERATION = 3

export class Accelerated implements IModificator {
  private acceleration: number = 0
  private previousDirection = 0
  private addEffect: (data: IEffect) => void

  constructor(apply: (data: IEffect) => void) {
    this.addEffect = apply
  }

  destroy() {}

  apply(effects: Effect[]) {
    let foundMoveX = false
    const collision = effects.find(item => (item.type === 'collision' && (item.direction === 'left' || item.direction === 'right')))

    if(collision) {
      this.acceleration = 0
      return
    }

    effects.forEach(item => {
      if((item.type === 'move') && item.x) {
        const direction = Math.sign(item.x)

        if(this.acceleration < MAX_ACCELERATION) {
          this.acceleration += 0.05
        }

        this.addEffect(new Move(this.acceleration * Math.sign(item.x), 0))

        if(direction === this.previousDirection) {
          foundMoveX = true
        } else {
          this.acceleration = 0
          this.previousDirection = direction
        }
        
      }
    })

    if(!foundMoveX && this.acceleration > 0) {
      this.acceleration -= 0.5
    } 
  }
}
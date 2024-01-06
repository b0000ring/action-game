import { Effect } from '@common/types/Effect'
import { IEffect } from '@game/interfaces/IEffect'
import { IModificator } from '@game/interfaces/IModificator'
import { Move } from '../effects/Move'

const MAX_ACCELERATION = 15
const GRAVITY = 3

export class Weighty implements IModificator {
  private acceleration: number = 0
  private addEffect: (data: IEffect) => void

  constructor(apply: (data: IEffect) => void) {
    this.addEffect = apply
  }

  destroy() {}

  apply(effects: Effect[]) {
    let foundCollision = false
    effects.forEach(item => {
      if((item.type === 'collision' && item.direction === 'down') || item.type === 'move' && item.y) {
        this.acceleration = 0
        foundCollision = true
      }
    })

    if(!foundCollision) {
      if(this.acceleration < MAX_ACCELERATION) {
        this.acceleration += 0.5
      }

      this.addEffect(new Move(0, this.acceleration + GRAVITY))
    } 
  }
}
import { IEffect } from '@game/interfaces/IEffect'
import { IModificator } from '@game/interfaces/IModificator'
import { subscribe, unsubscribe } from '@game/modules/handlers/Physics'
import { Move } from '../effects/Move'
import { Effect } from '@common/types/Effect'


export class Physical implements IModificator {
  private addEffect: (data: IEffect) => void
  private impulses: {x?: number, y?: number, length?: number}[] = []
  
  private update = () => {
    let newX = 0
    let newY = 3

    this.impulses.forEach(item => {
      newX += item.x || 0
      newY += item.y || 0
      item.length = (item.length || 1) - 1
    })

    this.addEffect(new Move(newX, newY))
    this.impulses = this.impulses.filter(item => item.length)
  }

  constructor(apply: (data: IEffect) => void) {
    this.addEffect = apply
    subscribe(this.update)
  }

  destroy() {
    unsubscribe(this.update)
  }

  apply(effects: Effect[]) {
    const impulses = effects.filter(item => item.type === 'impulse')
      .map(item => ({
        x: item.x,
        y: item.y,
        length: item.length
      }))
    this.impulses = [...this.impulses, ...impulses]
  }
}
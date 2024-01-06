import { IEffect } from '@game/interfaces/IEffect'
import { IModificator } from '@game/interfaces/IModificator'
import { Move } from '../effects/Move'
import { Effect } from '@common/types/Effect'


export class Physical implements IModificator {
  private addEffect: (data: IEffect) => void
  private impulses: {impulsex?: (power?: number) => number, impulsey?: (power?: number) => number, length?: number}[] = []
  
  private update = () => {
    let newX = 0
    let newY = 0

    this.impulses.forEach(item => {
      newX += item.impulsex?.(item.length) || 0
      newY += item.impulsey?.(item.length) || 0
      item.length = (item.length || 1) - 1
    })

    this.addEffect(new Move(newX, newY))
    this.impulses = this.impulses.filter(item => item.length)
  }

  constructor(apply: (data: IEffect) => void) {
    this.addEffect = apply
  }

  destroy() {}

  apply(effects: Effect[]) {
    const impulses = effects.filter(item => item.type === 'impulse')
      .map(item => ({
        impulsex: item.impulsex,
        impulsey: item.impulsey,
        length: item.length
      }))

    this.impulses = [...this.impulses, ...impulses]

    this.update()
  }
}
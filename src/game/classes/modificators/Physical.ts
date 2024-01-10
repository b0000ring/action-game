import { IEffect } from '@game/interfaces/IEffect'
import { IModificator } from '@game/interfaces/IModificator'
import { Move } from '../effects/Move'
import { Effect } from '@common/types/Effect'


export class Physical implements IModificator {
  private addEffect: (data: IEffect) => void
  private impulses: {impulsex?: (power?: number) => number, impulsey?: (power?: number) => number, length?: number}[] = []
  private collisions = {
    up: false,
    down: false,
    right: false,
    left: false
  }
  
  private update = () => {
    let newX = 0
    let newY = 0

    this.impulses.forEach(item => {
      const movex = item.impulsex?.(item.length) || 0
      const movey = item.impulsey?.(item.length) || 0

      // stop impulse if collision
      if(this.collisions.right && movex > 0 || this.collisions.left && movex < 0) {
        item.impulsex = () => 0
      }
      if(this.collisions.up && movey < 0 || this.collisions.down && movey > 0) {
        item.impulsey = () => 0
      }

      newX += movex
      newY += movey
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
    // TODO refactor
    this.collisions = {
      up: false,
      down: false,
      right: false,
      left: false
    }

    effects.filter(item => item.type === 'collision')
      .forEach(item => {
        if(item.direction === 'up') this.collisions.up = true
        if(item.direction === 'down') this.collisions.down = true
        if(item.direction === 'left') this.collisions.left = true
        if(item.direction === 'right') this.collisions.right = true
      })

    this.update()
  }
}
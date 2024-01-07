import { IActor } from '@game/interfaces/IActor'
import { IModificator } from '@game/interfaces/IModificator'
import { Effects } from './effects/Effects'
import { Identifiable } from './modificators/Identifiable'

// general object with position
export abstract class Actor implements IActor {
  protected modificators: IModificator[] = []
  protected effects = new Effects()
  // 1 - default, -1 mirrored
  protected direction: 1 | -1 = 1
  protected x: number
  protected y: number
  protected width: number
  protected height: number

  protected applyEffects = () => {
    this.modificators.forEach(item => item.apply(this.effects.effects))
    this.effects.clear()
  }

  protected move = (x: number, y: number) => {
    this.x += x
    this.y += y
  }

  constructor(key: string, x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.modificators.push(new Identifiable(key))
  }

  get data() {
    const modificators = {}
    this.modificators.forEach(item => {
      const state = item.state

      if(state) {
        Object.assign(modificators, state)
      }
    })

    return {
      direction: this.direction,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      effects: this.effects.effects,
      modificators
    }
  }

  destroy = () => {
    this.modificators.forEach(item => item.destroy())
    this.modificators = []
  }
}
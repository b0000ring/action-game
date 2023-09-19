import { IActor } from '@game/interfaces/IActor'
import { IModificator } from '@game/interfaces/IModificator'
import { Effects } from './effects/Effects'

// general object with position
export abstract class Actor implements IActor {
  protected modificators: IModificator[] = []
  protected effects = new Effects()
  protected x: number
  protected y: number
  protected width: number
  protected height: number

  protected move = (x: number, y: number) => {
    this.x += x
    this.y += y
  }

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  get data() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      effects: this.effects.effects
    }
  }

  destroy() {
    this.modificators.forEach(item => item.destroy())
  }
}
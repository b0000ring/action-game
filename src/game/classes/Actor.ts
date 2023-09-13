import { IActor } from '@game/interfaces/IActor'
import { IModificator } from '@game/interfaces/IModificator'
import { Effects } from './effects/Effects'

// general object with position
export abstract class Actor implements IActor {
  protected modificators: IModificator[] = []
  protected effects = new Effects()
  protected x: number
  protected y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  get data() {
    return {
      x: this.x,
      y: this.y
    }
  }

  destroy() {
    this.modificators.forEach(item => item.destroy())
  }
}
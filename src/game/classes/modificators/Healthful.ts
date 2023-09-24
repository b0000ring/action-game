import { IModificator } from '@game/interfaces/IModificator'
import { Effect } from '@common/types/Effect'


export class Healthful implements IModificator {
  private ondie: () => void
  private health: number
  
  private reduce = (damage: number = 0) => {
    this.health -= damage
  }

  private add = () => {

  }

  constructor(health: number, ondie: () => void) {
    this.health = health
    this.ondie = ondie
  }

  destroy() {}

  apply(effects: Effect[]) {
    const damages = effects.filter(item => item.type === 'damage')
    damages.forEach(item => this.reduce(item.damage))

    if(this.health <= 0) {
      this.ondie()
    }
  }
}
import { IModificator } from '@game/interfaces/IModificator'
import { Effect } from '@common/types/Effect'

export class Turnable implements IModificator {  
  private turn:  (direction: 1 | -1) => void

  constructor(turn: (direction: 1 | -1) => void) {
    this.turn = turn
  }

  apply(effects: Effect[]) {
    const turnings = effects.filter(item => item.type === 'turn')
    turnings.forEach(item => item.turning && this.turn(item.turning))
  } 

  destroy() {}
}
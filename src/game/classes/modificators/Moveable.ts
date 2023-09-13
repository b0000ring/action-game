import { Effect } from '@common/types/Effect'
import { IModificator } from '@game/interfaces/IModificator'

export class Moveable implements IModificator {
  private _move: (x: number, y: number) => void

  constructor(move: (x: number, y: number) => void) {
    this._move = move
  }

  destroy() {
    
  }

  apply(effects: Effect[]) {
    effects.forEach(item => {
      if(item.type === 'move') {
        this._move(item.x, item.y)
      }
    })
  }
}
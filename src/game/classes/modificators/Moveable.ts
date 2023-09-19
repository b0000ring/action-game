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
    const collisions = effects.filter(item => item.type === 'collision')
    effects.forEach(item => {
      // TODO fix type
      if(item.type === 'move' && item.x !== undefined && item.y !== undefined) {
        let newX = item.x
        let newY = item.y

        collisions.forEach(item => {
          if(item.direction === 'down' && newY > 0) {
            newY = 0
          }
        })

        this._move(newX, newY)
      }
    })
  }
}
import { IEffect } from '@game/interfaces/IEffect'
import { IModificator } from '@game/interfaces/IModificator'
import { checkCollisions } from '@game/modules/handlers/Collision'
import { Collision } from '../effects/Collision'
import { Actor } from '@common/types/Actor'

export class Colliding implements IModificator {
  private addEffect: (data: IEffect) => void
  private offset: {x: number, y: number}[] = []  
  private move: (x: number, y: number) => void
  private getCoords: () => Actor

  //TODO fix type
  private update = (direction: string, data: {x: number, y: number}) => {
    if(data.x || data.y > 1 || data.y < -1) {
      this.offset.push(data)
    }
    this.addEffect(new Collision(direction))
  }

  constructor(getCoords: () => Actor, apply: (data: IEffect) => void, move: (x: number, y: number) => void) {
    this.addEffect = apply
    this.move = move
    this.getCoords = getCoords
  }

  destroy() {}

  apply() {
    checkCollisions(this.getCoords(), this.update)


    const offset = this.offset.reduce((acc, item) => {
      if(item.x > 0 && item.x > acc.x || item.x < 0 && item.x < acc.x) {
        acc.x = item.x
      }
      if(item.y > 0 && item.y > acc.y || item.y < 0 && item.y < acc.y) {
        acc.y = item.y
      }
  
      return acc
    }, {x:0, y: 0})

    this.offset = []
  
    if(offset.x || offset.y) {
      this.move(offset.x, offset.y)
    }
  }
}
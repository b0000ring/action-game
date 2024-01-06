import { IEffect } from '@game/interfaces/IEffect'
import { IModificator } from '@game/interfaces/IModificator'
import { subscribeColliding, unsubscribeColliding } from '@game/modules/handlers/Collision'
import { Collision } from '../effects/Collision'
import { Actor } from '@common/types/Actor'


export class Colliding implements IModificator {
  private addEffect: (data: IEffect) => void
  
  //TODO fix type
  private update = (direction: string) => {
    this.addEffect(new Collision(direction))
  }

  constructor(getCoords: () => Actor, apply: (data: IEffect) => void) {
    this.addEffect = apply
    subscribeColliding(getCoords, this.update)
  }

  destroy() {
    unsubscribeColliding(this.update)
  }

  apply() {}
}
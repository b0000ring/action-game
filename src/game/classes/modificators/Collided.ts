import { IEffect } from '@game/interfaces/IEffect'
import { IModificator } from '@game/interfaces/IModificator'
import { subscribeCollided, unsubscribeCollided } from '@game/modules/handlers/Collision'
import { Collision } from '../effects/Collision'
import { Actor } from '@common/types/Actor'


export class Collided implements IModificator {
  private addEffect: (data: IEffect) => void
  
  //TODO fix type
  private update = (direction: string) => {
    this.addEffect(new Collision(direction))
  }

  constructor(getCoords: () => Actor, apply: (data: IEffect) => void) {
    this.addEffect = apply
    subscribeCollided(getCoords, this.update)
  }

  destroy() {
    unsubscribeCollided(this.update)
  }

  apply() {}
}
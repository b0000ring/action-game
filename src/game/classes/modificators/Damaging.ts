import { IEffect } from '@game/interfaces/IEffect'
import { IModificator } from '@game/interfaces/IModificator'
import { subscribeDamaging, unsubscribeDamaging } from '@game/modules/handlers/Damage'
import { Actor } from '@common/types/Actor'


export class Damaging implements IModificator {
  private getEffect: () => IEffect
  
  constructor(getCoords: () => Actor, getEffect: () => IEffect) {
    this.getEffect = getEffect
    subscribeDamaging(getCoords, this.getEffect)
  }

  destroy() {
    unsubscribeDamaging(this.getEffect)
  }

  apply() {}
}
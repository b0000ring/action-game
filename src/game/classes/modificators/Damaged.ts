import { IEffect } from '@game/interfaces/IEffect'
import { IModificator } from '@game/interfaces/IModificator'
import { subscribeDamaged, unsubscribeDamaged } from '@game/modules/handlers/Damage'
import { Actor } from '@common/types/Actor'

export class Damaged implements IModificator {
  private addEffect: (data: IEffect) => void
  
  private update = (effect: IEffect) => {
    this.addEffect(effect)
  }

  constructor(getCoords: () => Actor, apply: (data: IEffect) => void) {
    this.addEffect = apply
    subscribeDamaged(getCoords, this.update)
  }

  destroy() {
    unsubscribeDamaged(this.update)
  }

  apply() {}
}
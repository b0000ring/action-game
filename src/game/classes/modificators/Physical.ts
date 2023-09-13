import { IEffect } from '@game/interfaces/IEffect'
import { IModificator } from '@game/interfaces/IModificator'
import { subscribe, unsubscribe } from '@game/modules/handlers/Physics'
import { Move } from '../effects/Move'


export class Physical implements IModificator {
  private addEffect: (data: IEffect) => void
  
  private update = () => {
    this.addEffect(new Move(0, 1))
  }

  constructor(apply: (data: IEffect) => void) {
    this.addEffect = apply
    subscribe(this.update)
  }

  destroy() {
    unsubscribe(this.update)
  }

  apply() {}
}
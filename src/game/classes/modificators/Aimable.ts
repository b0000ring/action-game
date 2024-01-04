import { Actor } from '@common/types/Actor'
import { Effect } from '@common/types/Effect'
import { IModificator } from '@game/interfaces/IModificator'
import { subscribeAimable, unsubscribeAimable } from '@game/modules/handlers/Aiming'

export class Aimable implements IModificator {
  private getCoords: () => Actor

  constructor(getCoords: () => Actor) {
    this.getCoords = getCoords
    subscribeAimable(this.getCoords)
  }

  destroy() {
    unsubscribeAimable(this.getCoords)
  }

  apply(effects: Effect[]) {}
}
import { Actor } from '@common/types/Actor'
import { IModificator } from '@game/interfaces/IModificator'
import { subscribeAiming, unsubscribeAiming } from '@game/modules/handlers/Aiming'


export class Aiming implements IModificator {
  private updateCoords(target: Actor) {
    console.log(target)
  }
  
  constructor() {
    subscribeAiming(this.updateCoords)
  }

  destroy() {
    unsubscribeAiming(this.updateCoords)
  }

  apply() {}
}
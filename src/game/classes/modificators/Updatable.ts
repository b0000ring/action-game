import { IModificator } from '@game/interfaces/IModificator'
import { subscribe, unsubscribe } from '@game/modules/handlers/Updates'

export class Updatable implements IModificator {
  private callback: () => void

  constructor(cb: () => void) {
    this.callback = cb
    subscribe(this.callback)
  }

  destroy() {
    unsubscribe(this.callback)
  }

  apply() {}
}
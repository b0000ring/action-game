import { Actor } from '@common/types/Actor'
import { IModificator } from '@game/interfaces/IModificator'
import { subscribe, unsubscribe } from '@game/modules/Exporting'

export class Exportable implements IModificator {
  private callback: () => Actor

  constructor(cb: () => Actor) {
    this.callback = cb
    subscribe(this.callback)
  }

  destroy() {
    unsubscribe(this.callback)
  }

  apply() {}
}
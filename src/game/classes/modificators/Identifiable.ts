import { IModificator } from '@game/interfaces/IModificator'
import { get } from '@game/modules/handlers/Id'


export class Identifiable implements IModificator {
  private id: string

  constructor(type: string) {
    this.id = get(type)
  }

  get state() {
    return {
      id: this.id
    }
  }

  destroy() {}

  apply() {}
}
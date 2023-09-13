import { Effect } from '@common/types/Effect'
import { IEffect } from '@game/interfaces/IEffect'

export class Effects {
  private _effects: IEffect[] = []

  add = (effect: IEffect) => {
    this._effects.push(effect)
  }

  get effects(): Effect[] {
    return this._effects.map(item => item.data)
  }

  clear() {
    this._effects = []
  }
}
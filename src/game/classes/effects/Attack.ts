import { IEffect } from '@game/interfaces/IEffect'

export class Attack implements IEffect {
  get data() {
    return {
      type: 'attack',
    }
  }
}
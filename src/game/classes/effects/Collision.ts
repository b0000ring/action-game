import { IEffect } from '@game/interfaces/IEffect'

export class Collision implements IEffect {
  private direction: string

  constructor(direction: string) {
    this.direction = direction
  }

  get data() {
    return {
      type: 'collision',
      direction: this.direction,
    }
  }
}
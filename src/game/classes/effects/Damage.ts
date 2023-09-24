import { IEffect } from '@game/interfaces/IEffect'

export class Damage implements IEffect {
  private points: number

  constructor(points: number) {
    this.points = points
  }

  get data() {
    return {
      type: 'damage',
      damage: this.points,
    }
  }
}
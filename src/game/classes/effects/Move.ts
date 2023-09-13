import { IEffect } from '@game/interfaces/IEffect'

export class Move implements IEffect {
  private x: number
  private y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  get data() {
    return {
      type: 'move',
      x: this.x,
      y: this.y
    }
  }
}
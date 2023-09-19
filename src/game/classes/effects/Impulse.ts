import { IEffect } from '@game/interfaces/IEffect'

export class Impulse implements IEffect {
  private x: number
  private y: number
  private length: number

  constructor(x: number, y: number, length: number) {
    this.x = x
    this.y = y
    this.length = length
  }

  get data() {
    return {
      type: 'impulse',
      x: this.x,
      y: this.y,
      length: this.length
    }
  }
}
import { IEffect } from '@game/interfaces/IEffect'

export class Impulse implements IEffect {
  private impulsex: (power: number) => number
  private impulsey: (power: number) => number
  private length: number

  constructor(x: (power: number) => number, y: (power: number) => number, length: number) {
    this.impulsex = x
    this.impulsey = y
    this.length = length
  }

  get data() {
    return {
      type: 'impulse',
      impulsex: this.impulsex,
      impulsey: this.impulsey,
      length: this.length
    }
  }
}
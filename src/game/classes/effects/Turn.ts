import { IEffect } from '@game/interfaces/IEffect'

export class Turn implements IEffect {
  direction: 1 | -1

  constructor(direction: 1 | -1) {
    this.direction = direction
  }
  
  get data() {
    return {
      type: 'turn',
      turning: this.direction
    }
  }
}
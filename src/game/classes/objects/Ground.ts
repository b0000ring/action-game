import { Actor } from '../Actor'
import { Collided } from '../modificators/Collided'

export class Ground extends Actor {
  constructor(x: number, y: number) {
    super(x, y, 200, 30)

    this.modificators.push(new Collided(() => this.data, this.effects.add))
  }

  applyEffects = () => {
    this.modificators.forEach(item => item.apply(this.effects.effects))
    this.effects.clear()
  }
}
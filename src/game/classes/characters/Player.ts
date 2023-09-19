import { Actor } from '../Actor'
import { Collided } from '../modificators/Collided'
import { Controlled } from '../modificators/Controlled'
import { Moveable } from '../modificators/Moveable'
import { Physical } from '../modificators/Physical'
import { Updatable } from '../modificators/Updatable'

export class Player extends Actor {
  constructor(x: number, y: number) {
    super(x, y, 20, 50)

    this.modificators.push(new Controlled(this.effects.add))
    this.modificators.push(new Physical(this.effects.add))
    this.modificators.push(new Collided(() => this.data, this.effects.add))
    this.modificators.push(new Moveable(this.move))
    this.modificators.push(new Updatable(this.applyEffects))
  }

  applyEffects = () => {
    this.modificators.forEach(item => item.apply(this.effects.effects))
    this.effects.clear()
  }
}
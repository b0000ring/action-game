import { Actor } from '../Actor'
import { Controlled } from '../modificators/Controlled'
import { Moveable } from '../modificators/Moveable'
import { Physical } from '../modificators/Physical'
import { Updatable } from '../modificators/Updatable'

export class Player extends Actor {

  private move = (x: number, y: number) => {
    this.x += x
    this.y += y
  }

  constructor(x: number, y: number) {
    super(x, y)

    this.modificators.push(new Controlled(this.effects.add))
    // this.modificators.push(new Physical(this.effects.add))

    this.modificators.push(new Moveable(this.move))
    this.modificators.push(new Updatable(this.applyEffects))
  }

  applyEffects = () => {
    this.modificators.forEach(item => item.apply(this.effects.effects))
    this.effects.clear()
  }
}
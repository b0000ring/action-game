import { Actor } from '../Actor'
import { Attacking } from '../modificators/Attacking'
import { Collided } from '../modificators/Collided'
import { Controlled } from '../modificators/Controlled'
import { Exportable } from '../modificators/Exportable'
import { Moveable } from '../modificators/Moveable'
import { Physical } from '../modificators/Physical'
import { Turnable } from '../modificators/Turnable'
import { Updatable } from '../modificators/Updatable'

export class Player extends Actor {
  constructor(x: number, y: number) {
    super(x, y, 20, 50)

    this.modificators.push(new Controlled(this.effects.add))
    this.modificators.push(new Physical(this.effects.add))
    this.modificators.push(new Collided(() => this.data, this.effects.add))
    this.modificators.push(new Moveable(this.move))
    this.modificators.push(new Turnable((direction) => this.direction = direction))
    this.modificators.push(new Attacking(() => this.data))
    this.modificators.push(new Updatable(this.applyEffects))
    this.modificators.push(new Exportable(() => this.data))
  }
}
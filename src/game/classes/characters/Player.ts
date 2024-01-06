import { Actor } from '../Actor'
import { Accelerated } from '../modificators/Accelerated'
import { Attacking } from '../modificators/Attacking'
import { Collided } from '../modificators/Collided'
import { Colliding } from '../modificators/Colliding'
import { Controlled } from '../modificators/Controlled'
import { Exportable } from '../modificators/Exportable'
import { Moveable } from '../modificators/Moveable'
import { Physical } from '../modificators/Physical'
import { Turnable } from '../modificators/Turnable'
import { Updatable } from '../modificators/Updatable'
import { Weighty } from '../modificators/Weighty'

export class Player extends Actor {
  constructor(x: number, y: number) {
    super('player', x, y, 20, 50)

    this.modificators.push(new Controlled(this.effects.add))
    this.modificators.push(new Physical(this.effects.add))
    this.modificators.push(new Accelerated(this.effects.add))
    this.modificators.push(new Weighty(this.effects.add))
    this.modificators.push(new Colliding(() => this.data, this.effects.add))
    this.modificators.push(new Collided(() => this.data, this.effects.add))
    this.modificators.push(new Moveable(this.move))
    this.modificators.push(new Turnable((direction) => this.direction = direction))
    this.modificators.push(new Attacking(() => this.data))
    this.modificators.push(new Updatable(this.applyEffects))
    this.modificators.push(new Exportable(() => this.data))
  }
}
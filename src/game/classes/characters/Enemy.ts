import { Actor } from '../Actor'
import { Attacking } from '../modificators/Attacking'
import { Collided } from '../modificators/Collided'
import { Colliding } from '../modificators/Colliding'
import { Damaged } from '../modificators/Damaged'
import { Exportable } from '../modificators/Exportable'
import { Healthful } from '../modificators/Healthful'
import { Intellectual } from '../modificators/Intellectual'
import { Moveable } from '../modificators/Moveable'
import { Physical } from '../modificators/Physical'
import { Turnable } from '../modificators/Turnable'
import { Updatable } from '../modificators/Updatable'
import { Weighty } from '../modificators/Weighty'

export class Enemy extends Actor {
  constructor(x: number, y: number) {
    super('enemy', x, y, 20, 50)

    this.modificators.push(new Weighty(this.effects.add))
    this.modificators.push(new Damaged(() => this.data, this.effects.add))
    this.modificators.push(new Healthful(20, this.destroy))
    this.modificators.push(new Intellectual(this.effects.add))
    this.modificators.push(new Physical(this.effects.add))
    this.modificators.push(new Colliding(() => this.data, this.effects.add))
    this.modificators.push(new Collided(() => this.data, this.effects.add))
    this.modificators.push(new Moveable(this.move))
    this.modificators.push(new Turnable((direction) => this.direction = direction))
    this.modificators.push(new Attacking(() => this.data))
    this.modificators.push(new Updatable(this.applyEffects))
    this.modificators.push(new Exportable(() => this.data))
  }
}
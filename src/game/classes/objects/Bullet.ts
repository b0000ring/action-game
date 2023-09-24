import { Actor } from '../Actor'
import { Damage } from '../effects/Damage'
import { Impulse } from '../effects/Impulse'
import { Collided } from '../modificators/Collided'
import { Damaging } from '../modificators/Damaging'
import { Exportable } from '../modificators/Exportable'
import { Moveable } from '../modificators/Moveable'
import { Physical } from '../modificators/Physical'
import { Updatable } from '../modificators/Updatable'

export class Bullet extends Actor {
  constructor(x: number, y: number, direction: 1 | -1) {
    super('bullet', x, y, 10, 5)

    this.effects.add(new Impulse(direction * 5, -3, 200))

    this.modificators.push(new Damaging(() => this.data, () => new Damage(5)))
    this.modificators.push(new Physical(this.effects.add))
    this.modificators.push(new Exportable(() => this.data))
    this.modificators.push(new Moveable(this.move))
    this.modificators.push(new Collided(() => this.data, () => setTimeout(this.destroy, 0)))
    this.modificators.push(new Updatable(this.applyEffects))
  }
}
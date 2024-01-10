import { Actor } from '../Actor'
import { Damage } from '../effects/Damage'
import { Impulse } from '../effects/Impulse'
import { Colliding } from '../modificators/Colliding'
import { Damaging } from '../modificators/Damaging'
import { Exportable } from '../modificators/Exportable'
import { Moveable } from '../modificators/Moveable'
import { Physical } from '../modificators/Physical'
import { Updatable } from '../modificators/Updatable'

export class Bullet extends Actor {
  // TODO fix direction type everywhere
  constructor(x: number, y: number, direction: 1 | -1) {
    const type = 'bullet'

    super(type, x, y, 10, 5)

    this.effects.add(new Impulse(() => direction * 5, () => 0, 200))

    this.modificators.push(new Damaging(() => this.data, () => {
      this.destroy()
      return new Damage(5)
    }))

    this.modificators.push(new Physical(this.effects.add))
    this.modificators.push(new Exportable(() => this.data))
    this.modificators.push(new Moveable(this.move))
    this.modificators.push(new Colliding(() => this.data, () => setTimeout(this.destroy, 0), this.move))
    this.modificators.push(new Updatable(this.applyEffects))
  }
}
import { IModificator } from '@game/interfaces/IModificator'
import { Move } from '../effects/Move'
import { IEffect } from '@game/interfaces/IEffect'
import { Attack } from '../effects/Attack'
import { Turn } from '../effects/Turn'

export class Intellectual implements IModificator {
  private addEffect: (data: IEffect) => void
  private attackCooldown = false

  private update = () => {
    this.addEffect(new Move(-1, 0))
    if(!this.attackCooldown) {
      this.attackCooldown = true
      this.addEffect(new Attack())
      setTimeout(() => this.attackCooldown = false, 1000)
    }
  }

  constructor(apply: (data: IEffect) => void) {
    this.addEffect = apply
    this.addEffect(new Turn(-1))
  }

  apply() {
    this.update()
  }

  destroy() {}
}
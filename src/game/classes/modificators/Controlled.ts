import { ICommand } from '@common/interfaces/ICommand'
import { IModificator } from '@game/interfaces/IModificator'
import { subscribe, unsubscribe } from '@game/modules/handlers/Controls'
import { Move } from '../effects/Move'
import { IEffect } from '@game/interfaces/IEffect'

export class Controlled implements IModificator {
  private addEffect: (data: IEffect) => void

  private moving = {
    left: 0,
    right: 0,
    top: 0,
    down: 0
  }

  private applyEffects() {
    const { down, left, right, top } = this.moving
    if(down || left || right || top) {
      this.addEffect(new Move(right - left, down - top))
    }
  }

  private update = (commands: ICommand[]) => {
    commands.forEach(item => {
      switch(item.type) {
        case 'start_go_right': 
          this.moving.right = 1
          break;
        case 'stop_go_left':
          this.moving.left = 0
          break;
        case 'start_go_left': 
          this.moving.left = 1
          break;
        case 'stop_go_right': 
          this.moving.right = 0
          break;
        default: 
          return
      }
    })

    this.applyEffects()
  }

  constructor(apply: (data: IEffect) => void) {
    this.addEffect = apply
    subscribe(this.update)
  }

  apply() {}

  destroy() {
    unsubscribe(this.update)
  }
}
import { ICommand } from '@common/interfaces/ICommand'
import { IModificator } from '@game/interfaces/IModificator'
import { subscribe, unsubscribe } from '@game/modules/handlers/Controls'
import { Move } from '../effects/Move'
import { IEffect } from '@game/interfaces/IEffect'
import { Effect } from '@common/types/Effect'
import { Impulse } from '../effects/Impulse'
import { Attack } from '../effects/Attack'
import { Turn } from '../effects/Turn'

export class Controlled implements IModificator {
  private addEffect: (data: IEffect) => void

  private moving = {
    left: 0,
    right: 0,
    top: 0,
    down: 0
  }
  private jump = false
  private attacking = false

  private applyEffects() {
    const { down, left, right, top } = this.moving
    if(down || left || right || top) {
      this.addEffect(new Move(right - left, down - top))
      if(left > right) {
        this.addEffect(new Turn(-1))
      } else {
        this.addEffect(new Turn(1))
      }
    }

    if(this.attacking) {
      this.addEffect(new Attack())
    }
  }

  private update = (commands: ICommand[]) => {
    commands.forEach(item => {
      switch(item.type) {
        case 'start_go_right': 
          this.moving.right = 1
          break
        case 'stop_go_left':
          this.moving.left = 0
          break
        case 'start_go_left': 
          this.moving.left = 1
          break
        case 'stop_go_right': 
          this.moving.right = 0
          break
        case 'jump':
          if(!this.jump) {
            const initialPower = 30
            const maxValue = 15
            this.addEffect(new Impulse(
              () => 0,
              (power: number) => -((maxValue / 2) * (1 + Math.cos((initialPower - power) * (Math.PI / (initialPower - 1))))),
              initialPower
            ))
          }
          break;   
        case 'start_attack':
          this.attacking = true   
          break;  
        case 'stop_attack':
          this.attacking = false  
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

  apply(effects: Effect[]) {
    let jump = true
    if(effects.find(item => item.type === 'collision' && item.direction === 'down')) {
      jump = false
    }
    this.jump = jump
  }

  destroy() {
    unsubscribe(this.update)
  }
}
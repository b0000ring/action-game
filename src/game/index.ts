import { ICommand } from '@common/interfaces/ICommand'
import { Player } from './classes/characters/Player'
import { Ground } from './classes/objects/Ground'
import { apply as applyControls } from './modules/handlers/Controls'
import { apply as applyUpdates } from './modules/handlers/Updates'
import { apply as applyPhysics } from './modules/handlers/Physics'
import { apply as applyCollisions } from './modules/handlers/Collision'

export class Game {
  player = new Player(200, 50)
  ground = new Ground(100, 200)
  ground2 = new Ground(100, 30)

  get state() {
    return {
      player: this.player.data,
      ground: this.ground.data,
      ground2: this.ground2.data
    }
  }

  update(commands: ICommand[]) {
    applyControls(commands)
    applyPhysics()
    applyCollisions()
    applyUpdates()
  }
}
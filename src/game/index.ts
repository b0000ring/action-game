import { ICommand } from '@common/interfaces/ICommand'
import { Player } from './classes/characters/Player'
import { Ground } from './classes/objects/Ground'
import { apply as applyControls } from './modules/handlers/Controls'
import { apply as applyUpdates } from './modules/handlers/Updates'
import { apply as applyPhysics } from './modules/handlers/Physics'
import { apply as applyCollisions } from './modules/handlers/Collision'

export class Game {
  player = new Player(0, 0)
  ground = new Ground(0, 200)

  get state() {
    return {
      player: this.player.data,
      ground: this.ground.data
    }
  }

  update(commands: ICommand[]) {
    applyControls(commands)
    applyPhysics()
    applyCollisions()
    applyUpdates()
  }
}
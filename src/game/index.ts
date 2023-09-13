import { ICommand } from '@common/interfaces/ICommand'
import { Player } from './classes/characters/Player'
import { apply as applyControls } from './modules/handlers/Controls'
import { apply as applyUpdates } from './modules/handlers/Updates'
import { apply as applyPhysics } from './modules/handlers/Physics'

export class Game {
  player = new Player(0, 0)

  get state() {
    return {
      player: this.player.data
    }
  }

  update(commands: ICommand[]) {
    applyControls(commands)
    applyPhysics()
    applyUpdates()
  }
}
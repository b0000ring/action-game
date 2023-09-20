import { ICommand } from '@common/interfaces/ICommand'
import { apply as applyControls } from './modules/handlers/Controls'
import { apply as applyUpdates } from './modules/handlers/Updates'
import { apply as applyPhysics } from './modules/handlers/Physics'
import { apply as applyCollisions } from './modules/handlers/Collision'
import { get as getDrawable } from './modules/handlers/Exporting'
import { GameState } from '@common/types/GameState'
import { initialize } from './modules/Initializer'

import data from '@game/data/levels/test.json'

export class Game {
  constructor() {
   initialize(data.items)
  }

  get state(): GameState {
    return {
      items: [...getDrawable()]
    }
  }

  update(commands: ICommand[]) {
    applyControls(commands)
    applyPhysics()
    applyCollisions()
    applyUpdates()
  }
}
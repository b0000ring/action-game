import { IAdapter } from '@common/interfaces/IAdapter'
import { ICommand } from '@common/interfaces/ICommand'
import { IGameState } from '@common/interfaces/IGameState'
import { Game } from '@game/index'

export class GameAdapter implements IAdapter<IGameState> {
  protected game: Game

  get data() {
    return this.game.state
  }

  constructor() {
    this.game = new Game()
  }

  subscribe(commands: ICommand[]) {
    this.game.update(commands)
  }
}
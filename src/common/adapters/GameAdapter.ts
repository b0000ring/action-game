import { IAdapter } from '@common/interfaces/IAdapter'
import { ICommand } from '@common/interfaces/ICommand'
import { GameState } from '@common/types/GameState'
import { Game } from '@game/index'

export class GameAdapter implements IAdapter<GameState> {
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
import { Keys, subscribe, unsubscribe } from '@app/modules/Commands'
import { GameAdapter } from '@common/adapters/GameAdapter'
import { IAdapter } from '@common/interfaces/IAdapter'
import { IGameState } from '@common/interfaces/IGameState'
import { IGameScene, SceneTypes } from "@common/interfaces/IScene"

export class GameScene implements IGameScene {
  protected game: IAdapter<IGameState>
  protected subscription: () => void
  
  type: IGameScene['type'] = SceneTypes.game

  get data() {
    return this.game.data
  }

  constructor() {
    this.game = new GameAdapter()
    this.subscription = this.game.subscribe.bind(this.game)
    subscribe(Keys.game, this.subscription)
  }

  destroy() {
    unsubscribe(Keys.game, this.subscription)
  }
}
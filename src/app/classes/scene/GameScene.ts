import { Keys, subscribe, unsubscribe } from '@app/modules/Commands'
import { GameAdapter } from '@common/adapters/GameAdapter'
import { IAdapter } from '@common/interfaces/IAdapter'
import { IScene } from "@common/interfaces/IScene"
import { GameState } from '@common/types/GameState'
import { SceneTypes, GameScene as GameSceneType } from '@common/types/Scene'

export class GameScene implements IScene<GameSceneType> {
  protected game: IAdapter<GameState>
  protected subscription: () => void
  
  type: GameSceneType['type'] = SceneTypes.game

  get data() {
    return {
      type: this.type,
      data: this.game.data
    }
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
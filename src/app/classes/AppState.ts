import { GameScene } from './scene/GameScene'
import { LoadingScene } from './scene/LoadingScene'
import { AnyScene } from '@common/types/Scene'
import { IScene } from '@common/interfaces/IScene'
import { InteractionEvents } from '@common/types/Event'

export class AppState {
  private _scene: IScene<AnyScene>

  set scene(newScene: IScene<AnyScene>) {
    this._scene?.destroy()
    this._scene = newScene
  }

  get state() {
    return {
      scene: this._scene.data
    }
  }

  constructor() {
    this._scene = new LoadingScene()
  }

  update(events: InteractionEvents) {
    if(events.loading.length > 0) {
      this.scene = new GameScene()
    }
  }
}
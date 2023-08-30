import { IScene } from '@common/interfaces/IScene'
import { InteractionEvents } from '@common/types/Event'
import { AnyScene } from '@common/types/Scene'
import { GameScene } from '../scene/GameScene'
import { LoadingScene } from '../scene/LoadingScene'

export class SceneController {
  private _scene: IScene<AnyScene>

  set scene(newScene: IScene<AnyScene>) {
    this._scene?.destroy()
    this._scene = newScene
  }

  get data() {
    return this._scene.data
  }

  constructor() {
    // default scene to load all the assets first
    this.scene = new LoadingScene()
  }

  update(events: InteractionEvents) {
    if(events.loading.length > 0) {
      this.scene = new GameScene()
    }
  }
}
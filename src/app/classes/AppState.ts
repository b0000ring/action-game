import { IAppState } from "@common/interfaces/IAppState"
import { IInteractionEvents } from '@common/interfaces/IInteractionEvent'
import { AnyScene } from "@common/interfaces/IScene"
import { GameScene } from './scene/GameScene'

export class AppState implements IAppState {
  private _scene: AnyScene

  set scene(newScene: AnyScene) {
    this._scene = newScene
  }

  get scene() {
    return this._scene
  }

  update(events: IInteractionEvents) {
    if(events.loading.length > 0) {
      this.scene = new GameScene()
    }
  }

  // map
}
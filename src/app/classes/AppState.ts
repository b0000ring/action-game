import { IAppState } from "@common/interfaces/IAppState";
import { AnyScene } from "@common/interfaces/IScene";

export class AppState implements IAppState {
  private _scene: AnyScene

  set scene(newScene: AnyScene) {
    this._scene = newScene
  }

  get scene() {
    return this._scene
  }
}
import { IAppState } from "@common/interfaces/IAppState"
import { AppState } from "./classes/AppState"
import { LoadingScene } from "./classes/LoadingScene"

export class App {
  private _state: IAppState

  constructor() {
    this._state = new AppState()
    this._state.scene = new LoadingScene()
  }

  get state(): IAppState {
    return this._state;
  }
}
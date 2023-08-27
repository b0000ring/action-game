import { AppState as AppStateType, IAppState } from "@common/interfaces/IAppState"
import { AppState } from "./classes/AppState"
import { LoadingScene } from "./classes/scene/LoadingScene"
import { IInteractionEvents } from "@common/interfaces/IInteractionEvent"
import { apply } from './modules/Commands'

export class App {
  private _state: IAppState

  constructor() {
    this._state = new AppState()
    this._state.scene = new LoadingScene()
  }

  get state(): AppStateType {
    return this._state.state
  }

  update(events: IInteractionEvents) {
    this._state.update(events)
    apply(events)
  }
}
import { InteractionEvents } from '@common/types/Event'
import { AppState } from "./classes/AppState"
import { apply } from './modules/Commands'

export class App {
  private _state: AppState

  constructor() {
    this._state = new AppState()
  }

  get state(): AppState['state'] {
    return this._state.state
  }

  update(events: InteractionEvents) {
    this._state.update(events)
    apply(events)
  }
}
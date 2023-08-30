import { InteractionEvents } from '@common/types/Event'
import { AppState } from "./classes/AppState"
import { apply } from './modules/Commands'
import { SystemData } from '@common/types/SystemData'
import { getSystemData } from './modules/System'

export class App {
  private _state: AppState
  
  systemData: SystemData

  constructor() {
    this._state = new AppState()
    this.systemData = getSystemData()
  }

  get state(): AppState['state'] {
    return this._state.state
  }

  update(events: InteractionEvents) {
    this._state.update(events)
    apply(events)
  }
}
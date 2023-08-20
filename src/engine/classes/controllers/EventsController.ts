import { IInteractionEvents } from '@common/interfaces/IInteractionEvent'
import { KeyboardController } from './KeyboardController'
import { LoadingController } from './LoadingController'

export class EventsController {
  private keyboardController: KeyboardController
  private loadingController: LoadingController

  get events(): IInteractionEvents {
    return {
      keyboard: this.keyboardController.data,
      loading: this.loadingController.data
    }
  }

  constructor() {
    this.keyboardController = new KeyboardController()
    this.loadingController = new LoadingController()
  }
}
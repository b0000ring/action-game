import { InteractionEvents } from '@common/types/Event'
import { KeyboardController } from './KeyboardController'
import { LoadingController } from './LoadingController'

export class EventsController {
  private keyboardController: KeyboardController
  private loadingController: LoadingController

  get events(): InteractionEvents {
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
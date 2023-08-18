import { IEventsController } from "../../interfaces/IEventsController"
import { KeyboardController } from './KeyboardController'

export class EventsController implements IEventsController {
  private keyboardController: KeyboardController

  get events() {
    return {
      keyboard: this.keyboardController.data
    }
  }

  constructor() {
    this.keyboardController = new KeyboardController()
  }
}
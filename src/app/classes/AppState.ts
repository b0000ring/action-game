import { InteractionEvents } from '@common/types/Event'
import { SceneController } from './controller/SceneController'

export class AppState {
  protected sceneController: SceneController

  get state() {
    return {
      scene: this.sceneController.data
    }
  }

  constructor() {
    this.sceneController = new SceneController()
  }

  update(events: InteractionEvents) {
    this.sceneController.update(events)
  }
}
import { IController } from '@engine/interfaces/IController'
import { IInteractionEvent, InteractionEventType } from '@common/interfaces/IInteractionEvent'
import { InteractionEvent } from '../InteractionEvent'

export class LoadingController implements IController<IInteractionEvent> {
  private events: IInteractionEvent[] = []

  private loadingComplete = () => {
    const event = new InteractionEvent(InteractionEventType.loadingDone, '')
    this.events.push(event)
  }

  constructor() {
    window.addEventListener('loading-complete', this.loadingComplete)
  }

  get data() {
    const events = this.events
    this.events = []
    return events
  }

  update() {}

  destroy() {
    window.removeEventListener('loading-complete', this.loadingComplete)
  }
}
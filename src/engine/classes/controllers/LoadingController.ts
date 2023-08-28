import { IController } from '@engine/interfaces/IController'
import {  InteractionEventType } from '@common/types/Event'
import { InteractionEvent } from '../InteractionEvent'

export class LoadingController implements IController<InteractionEvent> {
  private events: InteractionEvent[] = []

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
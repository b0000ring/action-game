import { IController } from '@engine/interfaces/IController'
import { IInteractionEvent, InteractionEventType } from '@common/interfaces/IInteractionEvent'
import { InteractionEvent } from '../InteractionEvent'

export class KeyboardController implements IController<IInteractionEvent> {
  private keys: IInteractionEvent[] = []

  constructor() {
    window.addEventListener('keydown', this.keyDown, false)
    window.addEventListener('keyup', this.keyUp, false)
  }

  get data() {
    const keys = this.keys
    this.keys = []
    return keys
  }

  keyDown = (e: KeyboardEvent) => {
    const event = new InteractionEvent(InteractionEventType.keydown, e.key)
    this.keys.push(event)
  }

  keyUp = (e: KeyboardEvent) => {
    const event = new InteractionEvent(InteractionEventType.keyup, e.key)
    this.keys.push(event)
  }

  destroy() {
    window.removeEventListener('keydown', this.keyDown)
    window.removeEventListener('keyup', this.keyUp)
  }
}
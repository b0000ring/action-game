import { IController } from '@engine/interfaces/IController'
import { InteractionEvent } from '../InteractionEvent'
import { InteractionEventType } from '@common/types/Event'

export class KeyboardController implements IController<InteractionEvent> {
  private keys: InteractionEvent[] = []

  private keyDown = (e: KeyboardEvent) => {
    const event = new InteractionEvent(InteractionEventType.keydown, e.key)
    this.keys.push(event)
  }

  private keyUp = (e: KeyboardEvent) => {
    const event = new InteractionEvent(InteractionEventType.keyup, e.key)
    this.keys.push(event)
  }

  constructor() {
    window.addEventListener('keydown', this.keyDown, false)
    window.addEventListener('keyup', this.keyUp, false)
  }

  get data() {
    const keys = this.keys
    this.keys = []
    return keys
  }

  update() {}

  destroy() {
    window.removeEventListener('keydown', this.keyDown)
    window.removeEventListener('keyup', this.keyUp)
  }
}
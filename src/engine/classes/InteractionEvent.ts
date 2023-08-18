import { IInteractionEvent, InteractionEventType } from '@common/interfaces/IInteractionEvent'

export class InteractionEvent implements IInteractionEvent {
  type: InteractionEventType
  data: string

  constructor(type: InteractionEventType, data: string) {
    this.type = type
    this.data = data
  }
}
import { InteractionEvent as InteractionEventType, InteractionEventType as InteractionEventTypes } from '@common/types/Event'

export class InteractionEvent implements InteractionEventType {
  type: InteractionEventTypes
  data: string

  constructor(type: InteractionEventTypes, data: string) {
    this.type = type
    this.data = data
  }
}
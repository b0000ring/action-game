export enum InteractionEventType {
  'keyup' = 'keyup',
  'keydown' = 'keydown',
  'loadingDone' = 'loadingDone'
}

export interface IInteractionEvents {
  keyboard: IInteractionEvent[]
  loading: IInteractionEvent[]
}

export interface IInteractionEvent {
  type: InteractionEventType;
  data: string;
}
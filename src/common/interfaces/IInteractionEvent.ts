export enum InteractionEventType {
  'keyup' = 'keyup',
  'keydown' = 'keydown',
}

export interface IInteractionEvents {
  keyboard: IInteractionEvent[]
}

export interface IInteractionEvent {
  type: InteractionEventType;
  data: string;
}
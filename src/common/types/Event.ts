export enum InteractionEventType {
  'keyup' = 'keyup',
  'keydown' = 'keydown',
  'loadingDone' = 'loadingDone'
}

export type InteractionEvents = {
  keyboard: InteractionEvent[]
  loading: InteractionEvent[]
}

export type InteractionEvent = {
  type: InteractionEventType;
  data: string;
}
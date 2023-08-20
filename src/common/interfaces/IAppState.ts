import { IInteractionEvents } from './IInteractionEvent'
import { AnyScene } from "./IScene"

export interface IAppState {
  scene: AnyScene
  update: (events: IInteractionEvents) => void
  // map
}
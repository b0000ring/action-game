import { IInteractionEvents } from './IInteractionEvent'
import { AnyScene, AnySceneData } from "./IScene"

export interface IAppState {
  scene: AnyScene
  state: AppState,
  update: (events: IInteractionEvents) => void
}

export type AppState =  {
  scene: AnySceneData
}
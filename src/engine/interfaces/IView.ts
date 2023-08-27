import { AnySceneData } from "@common/interfaces/IScene"

export interface IView {
  draw: (scene: AnySceneData) => void
}
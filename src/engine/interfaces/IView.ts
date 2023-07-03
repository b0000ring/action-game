import { AnyScene } from "@common/interfaces/IScene"

export interface IView {
  draw: (scene: AnyScene) => void
}
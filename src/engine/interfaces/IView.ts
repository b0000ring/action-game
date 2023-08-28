import { AnySceneData } from '@common/types/Scene'

export interface IView {
  draw: (scene: AnySceneData) => void
}
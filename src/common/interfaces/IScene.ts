import { SceneTypes } from '@common/types/Scene'

export interface IScene<T> {
  type: SceneTypes
  data: T
  destroy: () => void
}
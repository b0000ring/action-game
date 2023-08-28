import { IScene } from '@common/interfaces/IScene'
import { LoadingScene as LoadingSceneType, SceneTypes } from '@common/types/Scene'

export class LoadingScene implements IScene<LoadingSceneType> {
  type: LoadingSceneType['type'] = SceneTypes.loading

  get data() {
    return { type: this.type, data: null }
  }

  destroy = () => {}
}
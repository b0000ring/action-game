import { ILoadingScene, SceneTypes } from "@common/interfaces/IScene"

export class LoadingScene implements ILoadingScene {
  type: ILoadingScene['type'] = SceneTypes.loading
  data: null
}
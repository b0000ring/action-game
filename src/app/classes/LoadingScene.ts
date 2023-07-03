import { ILoadingScene, Types } from "@common/interfaces/IScene"

export class LoadingScene implements ILoadingScene {
  type: ILoadingScene['type'] = Types.loading
  data: null
}
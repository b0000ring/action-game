import { IGameScene, SceneTypes } from "@common/interfaces/IScene"

export class GameScene implements IGameScene {
  type: IGameScene['type'] = SceneTypes.game
  data: {}
}
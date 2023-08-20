import { IGameState } from "./IGameState"
import { IMenu } from "./IMenu"

export enum SceneTypes {
  loading = 'loading',
  game = 'game',
  menu = 'menu'
}

export interface IScene<T> {
  type: SceneTypes
  data: T
}

export interface ILoadingScene extends IScene<null> {
  type: SceneTypes.loading
}

export interface IGameScene extends IScene<IGameState> {
  type: SceneTypes.game
}

export interface IMenuScene extends IScene<IMenu>{
  type: SceneTypes.menu
}

export type AnyScene = IMenuScene | IGameScene | ILoadingScene
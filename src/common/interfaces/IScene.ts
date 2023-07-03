import { IGameState } from "./IGameState";
import { IMenu } from "./IMenu";

export enum Types {
  loading = 'loading',
  game = 'game',
  menu = 'menu'
}

export interface IScene<T> {
  type: Types
  data: T
}

export interface ILoadingScene extends IScene<null> {
  type: Types.loading
}

export interface IGameScene extends IScene<IGameState> {
  type: Types.game
}

export interface IMenuScene extends IScene<IMenu>{
  type: Types.menu
}

export type AnyScene = IMenuScene | IGameScene | ILoadingScene
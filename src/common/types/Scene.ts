import { GameState } from './GameState'
import { MenuState } from './MenuState'

export enum SceneTypes {
  loading = 'loading',
  game = 'game',
  menu = 'menu'
}

export type LoadingScene = {
  type: SceneTypes.loading
  data: null
}

export type GameScene = {
  type: SceneTypes.game
  data: GameState
}

export type MenuScene = {
  type: SceneTypes.menu,
  data: MenuState
}

export type AnyScene = MenuScene | GameScene | LoadingScene

export type AnySceneData = AnyScene['data']
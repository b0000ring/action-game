import { SceneTypes } from '@common/types/Scene'
import { IController } from '@engine/interfaces/IController'
import { Container, DisplayObject } from 'pixi.js'
import { LoadingView } from '../views/Loading'
import { IView } from '@engine/interfaces/IView'
import { GameView } from '../views/Game'
import { AppState } from '@common/types/AppState'

export class ViewController implements IController<void> {
  private container: Container<DisplayObject>
  private view: IView
  private _scene: SceneTypes
  
  private set scene(scene: SceneTypes) {
    if(this._scene === scene) {
      return
    }

    this._scene = scene
    // clear the view
    this.container.removeChildren()

    switch(scene) {
      case SceneTypes.loading:
        this.view = new LoadingView(this.container)
        break
      case SceneTypes.game:
        this.view = new GameView(this.container)
        break
      case SceneTypes.menu:
      default:
        return
    }
  }
  
  constructor(container: Container<DisplayObject>) {
    const localContainer = new Container()
    this.container = localContainer
    container.addChild(this.container)
  }

  get data() {
    return []
  }

  update(state: AppState) {
    this.scene = state.scene.type

    this.view.draw(state.scene)
  }

  destroy() {}
}
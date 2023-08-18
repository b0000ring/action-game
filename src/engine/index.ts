import { Application, ICanvas, Container } from 'pixi.js'

import { IAppState } from '@common/interfaces/IAppState'
import { Types } from '@common/interfaces/IScene'
import { IView } from './interfaces/IView'
import { LoadingView } from './classes/views/Loading'
import { IEventsController } from './interfaces/IEventsController'
import { EventsController } from './classes/controllers/EventsController'

export class Engine {
  private app: Application<ICanvas>
  private view: IView
  private currentType: Types
  private eventsController: IEventsController

  private setView(type: Types) {
    const container = new Container()
    this.app.stage.removeChildren()
    this.app.stage.addChild(container)

    switch(type) {
      case Types.loading:
        this.view = new LoadingView(container)
        break
      case Types.game:
      case Types.menu:
      default:
        return
    }
  }

  get events() {
    return this.eventsController.events
  }

  constructor() {
    this.app = new Application({ width: 640, height: 360 })
    this.eventsController = new EventsController()

    document.body.appendChild<any>(this.app.view)
  }

  run(update: () => void) {
    this.app.ticker.add(update)
  }

  render(state: IAppState) {
    const { scene } = state

    if(scene.type !== this.currentType) {
      this.setView(scene.type)
    }
    
    this.view.draw(scene)
  }
}
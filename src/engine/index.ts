import { Application, ICanvas, Container } from 'pixi.js'
import { EventsController } from './classes/controllers/EventsController'
import { ViewController } from './classes/controllers/ViewController'
import { ProcessController } from './classes/controllers/ProcessController'
import { AppState } from '@common/types/AppState'
import { SystemData } from '@common/types/SystemData'

export class Engine {
  private app: Application<ICanvas>
  private viewController: ViewController
  private eventsController: EventsController
  private processController: ProcessController
  // TODO add sound controller

  get events() {
    return this.eventsController.events
  }

  constructor(config: SystemData) {
    // create app
    this.app = new Application({ width: config.screenSize.width, height: config.screenSize.height })
    // create events controller
    this.eventsController = new EventsController()
    // create general view container
    const container = new Container()
    this.app.stage.addChild(container)
    // create view controller
    this.viewController = new ViewController(container)
    // create process controller
    this.processController = new ProcessController()
    // applying view to document body
    document.body.appendChild<any>(this.app.view)
  }

  run(update: () => void) {
    this.app.ticker.add(update)
  }

  update(state: AppState) {
    this.viewController.update(state)
    this.processController.update(state)
  }
}
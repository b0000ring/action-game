import { Application, ICanvas } from 'pixi.js'

import { IState } from '../common/interfaces/State'

export class Engine {

  app: Application<ICanvas>

  constructor() {
    this.app = new Application({ width: 640, height: 360 });
    document.body.appendChild<any>(this.app.view);
  }

  run(update: () => void) {
    this.app.ticker.add(update)
  }

  render(state: IState) {
    // console.log(state)
  }
}
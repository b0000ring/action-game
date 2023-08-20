import { App } from '@app/index'
import { Engine } from './engine'

(function start() {
  const app = new App()
  const engine = new Engine()

  function tick() {
    app.update(engine.events)
    engine.update(app.state)
  }

  engine.run(tick)
})()
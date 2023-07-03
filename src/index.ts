import { App } from '@app/index'
import { Engine } from './engine'

(function start() {
  const app = new App()
  const engine = new Engine()

  function tick() {
    const state = app.state
    engine.render(state)
  }

  engine.run(tick)
})()
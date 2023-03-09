import { Game } from './game'
import { Engine } from './engine'

(function start() {
  const game = new Game()
  const engine = new Engine()

  function tick() {
    const state = game.update()
    engine.render(state)
  }

  engine.run(tick)
})()
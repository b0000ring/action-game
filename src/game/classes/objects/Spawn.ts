import { Actor } from '../Actor'
import { Enemy } from '../characters/Enemy'

export class Spawn extends Actor {
  constructor(x: number, y: number) {
    super('spawn', x, y, 0, 0)

    setInterval(() => {
      new Enemy(x, y)
    }, 3000)
  }
}
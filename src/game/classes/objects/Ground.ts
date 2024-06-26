import { Actor } from '../Actor'
import { Collided } from '../modificators/Collided'
import { Exportable } from '../modificators/Exportable'

const CELL_SIZE = 40

export class Ground extends Actor {
  constructor(x: number, y: number, width: number = CELL_SIZE, height: number = CELL_SIZE) {
    super('ground', x, y, width, height)

    this.modificators.push(new Collided(() => this.data, () => null))
    this.modificators.push(new Exportable(() => this.data))
  }
}
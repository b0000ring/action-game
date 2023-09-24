import { Actor } from '../Actor'
import { Collided } from '../modificators/Collided'
import { Exportable } from '../modificators/Exportable'

const CELL_SIZE = 30

export class Ground extends Actor {
  constructor(x: number, y: number) {
    super('ground', x, y, CELL_SIZE, CELL_SIZE)

    this.modificators.push(new Collided(() => this.data, () => null))
    this.modificators.push(new Exportable(() => this.data))
  }
}
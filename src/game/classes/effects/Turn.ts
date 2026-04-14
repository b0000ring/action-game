import { IEffect } from "@game/interfaces/IEffect";
import { Direction } from "@game/types/Direction";

export class Turn implements IEffect {
  direction: Direction;

  constructor(direction: Direction) {
    this.direction = direction;
  }

  get data() {
    return {
      type: "turn",
      turning: this.direction,
    };
  }
}

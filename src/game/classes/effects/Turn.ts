import { IEffect } from "@game/interfaces/IEffect";

export class Turn implements IEffect {
  direction: 1 | 2 | 3 | 4;

  constructor(direction: 1 | 2 | 3 | 4) {
    this.direction = direction;
  }

  get data() {
    return {
      type: "turn",
      turning: this.direction,
    };
  }
}

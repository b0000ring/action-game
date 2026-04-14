import { IModificator } from "@game/interfaces/IModificator";
import { Direction } from "@game/types/Direction";
import { Effect } from "@common/types/Effect";

export class Turnable implements IModificator {
  private turn: (direction: Direction) => void;

  constructor(turn: (direction: Direction) => void) {
    this.turn = turn;
  }

  apply(effects: Effect[]) {
    const turnings = effects.filter((item) => item.type === "turn");
    turnings.forEach((item) => item.turning && this.turn(item.turning));
  }

  destroy() {}
}

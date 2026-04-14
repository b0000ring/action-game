import { IModificator } from "@game/interfaces/IModificator";
import { Effect } from "@common/types/Effect";
import { Actor } from "@common/types/Actor";
import { Bullet } from "../objects/Bullet";

export class Attacking implements IModificator {
  private getCoords: () => Actor;
  private cooldown = false;

  private createAttack() {
    const { x, y, width, height, direction } = this.getCoords();
    if (!this.cooldown) {
      this.cooldown = true;
      console.log(direction);
      new Bullet(x + width / 2, y + height / 2, direction);
      setTimeout(() => (this.cooldown = false), 100);
    }
  }

  constructor(getCoords: () => Actor) {
    this.getCoords = getCoords;
  }

  apply(effects: Effect[]) {
    const attacks = effects.filter((item) => item.type === "attack");
    attacks.forEach(() => this.createAttack());
  }

  destroy() {}
}

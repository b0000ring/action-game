import { Effect } from "@common/types/Effect";
import { IEffect } from "@game/interfaces/IEffect";
import { IModificator } from "@game/interfaces/IModificator";
import { Move } from "../effects/Move";

const MAX_ACCELERATION = 3;

export class Accelerated implements IModificator {
  private acceleration: number = 0;
  private previousDirectionX = 0;
  private previousDirectionY = 0;
  private addEffect: (data: IEffect) => void;

  constructor(apply: (data: IEffect) => void) {
    this.addEffect = apply;
  }

  destroy() {}

  apply(effects: Effect[]) {
    let foundMove = false;
    const collision = effects.find((item) => item.type === "collision");

    if (collision) {
      this.acceleration = 0;
      return;
    }

    effects.forEach((item) => {
      if (item.type === "move" && (item.x || item.y)) {
        const directionX = Math.sign(item.x || 0);
        const directionY = Math.sign(item.y || 0);
        if (this.acceleration < MAX_ACCELERATION) {
          this.acceleration += 0.05;
        }
        const speedX = this.acceleration * directionX;
        const speedY = this.acceleration * directionY;
        this.addEffect(new Move(speedX, speedY));

        if (
          directionX === this.previousDirectionX ||
          directionY === this.previousDirectionY
        ) {
          foundMove = true;
        } else {
          this.acceleration = 0;
          this.previousDirectionX = directionX;
          this.previousDirectionY = directionY;
        }
      }
    });

    if (!foundMove && this.acceleration > 0) {
      this.acceleration -= 0.5;
    }
  }
}

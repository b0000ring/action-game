import { ICommand } from "@common/interfaces/ICommand";
import { IModificator } from "@game/interfaces/IModificator";
import { subscribe, unsubscribe } from "@game/modules/handlers/Controls";
import { Move } from "../effects/Move";
import { IEffect } from "@game/interfaces/IEffect";
import { Effect } from "@common/types/Effect";
import { Impulse } from "../effects/Impulse";
import { Attack } from "../effects/Attack";
import { Turn } from "../effects/Turn";

export class Controlled implements IModificator {
  private addEffect: (data: IEffect) => void;

  private moving = {
    left: 0,
    right: 0,
    up: 0,
    down: 0,
  };
  private attacking = false;

  private applyEffects() {
    const { down, left, right, up } = this.moving;
    if (down || left || right || up) {
      this.addEffect(new Move(right - left, down - up));
      if (left || right) {
        if (left > right) {
          this.addEffect(new Turn(5));
        } else {
          this.addEffect(new Turn(1));
        }
      }

      if (down || up) {
        if (down > up) {
          this.addEffect(new Turn(3));
        } else {
          this.addEffect(new Turn(7));
        }
      }

      if (down && right) {
        this.addEffect(new Turn(2));
      }

      if (down && left) {
        this.addEffect(new Turn(4));
      }

      if (up && left) {
        this.addEffect(new Turn(6));
      }

      if (up && right) {
        this.addEffect(new Turn(8));
      }
    }

    if (this.attacking) {
      this.addEffect(new Attack());
    }
  }

  private update = (commands: ICommand[]) => {
    commands.forEach((item) => {
      switch (item.type) {
        case "start_go_right":
          this.moving.right = 2;
          break;
        case "start_go_up":
          this.moving.up = 2;
          break;
        case "start_go_down":
          this.moving.down = 2;
          break;
        case "start_go_left":
          this.moving.left = 2;
          break;
        case "stop_go_right":
          this.moving.right = 0;
          break;
        case "stop_go_up":
          this.moving.up = 0;
          break;
        case "stop_go_down":
          this.moving.down = 0;
          break;
        case "stop_go_left":
          this.moving.left = 0;
          break;
        case "start_attack":
          this.attacking = true;
          break;
        case "stop_attack":
          this.attacking = false;
          break;
        default:
          return;
      }
    });

    this.applyEffects();
  };

  constructor(apply: (data: IEffect) => void) {
    this.addEffect = apply;
    subscribe(this.update);
  }

  apply() {}

  destroy() {
    unsubscribe(this.update);
  }
}

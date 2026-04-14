import { Actor } from "../Actor";
import { Damage } from "../effects/Damage";
import { Impulse } from "../effects/Impulse";
import { Colliding } from "../modificators/Colliding";
import { Damaging } from "../modificators/Damaging";
import { Exportable } from "../modificators/Exportable";
import { Moveable } from "../modificators/Moveable";
import { Physical } from "../modificators/Physical";
import { Updatable } from "../modificators/Updatable";
import { Direction } from "@game/types/Direction";

export class Bullet extends Actor {
  constructor(x: number, y: number, direction: Direction) {
    const type = "bullet";

    super(type, x, y, 5, 5);
    this.effects.add(
      new Impulse(
        () => {
          if (direction === 1 || direction === 8 || direction === 2) return 5;
          if (direction === 4 || direction === 5 || direction === 6) return -5;
          return 0;
        },
        () => {
          if (direction === 2 || direction === 3 || direction === 4) return 5;
          if (direction === 6 || direction === 7 || direction === 8) return -5;
          return 0;
        },
        9999,
      ),
    );

    this.modificators.push(
      new Damaging(
        () => this.data,
        () => {
          this.destroy();
          return new Damage(5);
        },
      ),
    );

    this.modificators.push(new Physical(this.effects.add));
    this.modificators.push(new Exportable(() => this.data));
    this.modificators.push(new Moveable(this.move));
    this.modificators.push(
      new Colliding(
        () => this.data,
        () => setTimeout(this.destroy, 0),
        this.move,
      ),
    );
    this.modificators.push(new Updatable(this.applyEffects));
  }
}

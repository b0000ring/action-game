import { GameScene } from "@common/types/Scene";
import { IView } from "@engine/interfaces/IView";
import { Container, Graphics } from "pixi.js";

const ACTOR_COLORS: { [key: string]: number } = {
  player: 0x3b82f6,
  bush: 0x3fa34d,
  wall: 0x8b5a2b,
  bullet: 0xf4d03f,
};

export class GameView implements IView {
  private container: Container;
  private map: { [key: string]: Graphics } = {};

  constructor(container: Container) {
    this.container = container;
  }

  draw(data: GameScene) {
    const foundIds: string[] = [];
    data.data.items.forEach((item, i) => {
      const id = item.modificators.id;

      if (!id) return;

      foundIds.push(id);

      if (!this.map[id]) {
        const actorType = id.split("_")[0];
        const fillColor = ACTOR_COLORS[actorType] ?? 0xffffff;
        const newGraphics = new Graphics();
        newGraphics.beginFill(fillColor);
        newGraphics.lineStyle({ alignment: 0, color: 0x000000, width: 1 });
        newGraphics.drawRect(0, 0, item.width, item.height);
        newGraphics.x = item.x;
        newGraphics.y = item.y;

        this.map[id] = newGraphics;
        this.container.addChild(newGraphics);

        return;
      }

      this.map[id].x = item.x;
      this.map[id].y = item.y;
    });

    Object.entries(this.map).forEach((item) => {
      const [key, value] = item;

      if (!foundIds.includes(key)) {
        this.container.removeChild(value);
      }
    });
  }
}

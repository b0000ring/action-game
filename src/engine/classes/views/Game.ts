import { GameScene } from "@common/types/Scene"
import { IView } from "@engine/interfaces/IView"
import { Container, Graphics } from "pixi.js"

export class GameView implements IView {
  private container: Container

  constructor(container: Container) {
    this.container = container
  }

  draw(data: GameScene) {
    data.data.items.forEach((item, i) => {
      if(this.container.children[i]) {
        this.container.children[i].x = item.x
        this.container.children[i].y = item.y
        return
      }

      const newGraphics = new Graphics()
      newGraphics.beginFill(0xFFFF0)
      newGraphics.drawRect(0, 0, item.width, item.height)
      newGraphics.x = item.x
      newGraphics.y = item.y

      this.container.addChild(newGraphics)
    })

    if(this.container.children.length > data.data.items.length) {
      this.container.removeChildren(data.data.items.length)
    }
  }
}
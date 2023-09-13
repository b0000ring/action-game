import { GameScene } from "@common/types/Scene"
import { IView } from "@engine/interfaces/IView"
import { Container, Graphics, Text } from "pixi.js"

export class GameView implements IView {
  private container: Container
  private player: Graphics

  constructor(container: Container) {
    this.container = container

    this.player = new Graphics()
    this.player.beginFill(0xFFF00)
    this.player.drawRect(50, 50, 30, 50);
    this.container.addChild(this.player)
  }

  draw(data: GameScene) {
    this.player.x = data.data.player.x
    this.player.y = data.data.player.y
  }
}
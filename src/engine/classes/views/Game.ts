import { GameScene } from "@common/types/Scene"
import { IView } from "@engine/interfaces/IView"
import { Container, Graphics, Text } from "pixi.js"

export class GameView implements IView {
  private container: Container
  private player: Graphics
  private ground: Graphics

  constructor(container: Container) {
    this.container = container

    this.player = new Graphics()
    this.player.beginFill(0xFFF00)
    this.player.drawRect(0, 0, 30, 50)

    this.ground = new Graphics()
    this.ground.beginFill(0xFFFF0)
    this.ground.drawRect(0, 0, 30, 50)

    this.container.addChild(this.player)
    this.container.addChild(this.ground)

  }

  draw(data: GameScene) {
    this.player.x = data.data.player.x
    this.player.y = data.data.player.y
    this.player.width = data.data.player.width
    this.player.height = data.data.player.height

    this.ground.x = data.data.ground.x
    this.ground.y = data.data.ground.y
    this.ground.width = data.data.ground.width
    this.ground.height = data.data.ground.height
  }
}
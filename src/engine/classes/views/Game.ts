import { IGameScene } from "@common/interfaces/IScene"
import { IView } from "@engine/interfaces/IView"
import { Container, Graphics, Text } from "pixi.js"

export class GameView implements IView {
  private container: Container
  private player: Graphics
  private text: Text

  constructor(container: Container) {
    this.container = container
    this.text = new Text('Game', {
      fill: 0xFFFFFF,
      fontSize: 14
    })
    this.container.addChild(this.text)

    this.player = new Graphics()
    this.player.beginFill(0xFFFF00)
    this.player.drawRect(50, 50, 30, 50);
    this.container.addChild(this.player)
  }

  draw(data: IGameScene) {
    this.player.x = data.data.player.x
    this.player.y = data.data.player.y
  }
}
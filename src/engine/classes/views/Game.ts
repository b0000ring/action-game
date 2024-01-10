import { GameScene } from "@common/types/Scene"
import { IView } from "@engine/interfaces/IView"
import { Container, Graphics } from "pixi.js"

export class GameView implements IView {
  private container: Container
  private map:{[key: string]: Graphics} = {}

  constructor(container: Container) {
    this.container = container
  }

  draw(data: GameScene) {
    const foundIds: string[] = []
    data.data.items.forEach((item, i) => {
      const id = item.modificators.id

      if(!id) return

      foundIds.push(id)

      if(!this.map[id]) {
        const newGraphics = new Graphics()
        newGraphics.beginFill(0xFFFF0)
        newGraphics.lineStyle({alignment: 0, color: 0x00000, width: 1})
        newGraphics.drawRect(0, 0, item.width, item.height)
        newGraphics.x = item.x
        newGraphics.y = item.y
  
        this.map[id] = newGraphics
        this.container.addChild(newGraphics)

        return
      }

      this.map[id].x = item.x
      this.map[id].y = item.y
    })

   Object.entries(this.map).forEach(item => {
    const [key, value] = item

    if(!foundIds.includes(key)) {
      this.container.removeChild(value)
    }
   })
  }
}
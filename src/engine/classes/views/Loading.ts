import { AnyScene } from "@common/interfaces/IScene";
import { IView } from "@engine/interfaces/IView";
import { Container, Text } from "pixi.js";

export class LoadingView implements IView {
  private container: Container
  private text: Text

  constructor(container: Container) {
    this.container = container
    this.text = new Text('Loading', {
      fill: 0xFFFFFF,
      fontSize: 14
    });
    this.container.addChild(this.text)
  }

  draw(scene: AnyScene) {
    
  }
}
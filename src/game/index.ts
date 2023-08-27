import { ICommand } from '@common/interfaces/ICommand'

export class Game {
  player = {x: 0, y: 0}
  moving = [0, 0]

  get state() {
    return {
      player: this.player
    }
  }

  update(commands: ICommand[]) {
    commands.forEach(item => {
      switch(item.type) {
        case 'start_go_right': 
          this.moving = [1, 0]
          break;
        case 'start_go_left': 
          this.moving = [-1, 0]
          break;
        case 'stop_go_right': 
        case 'stop_go_left':
          this.moving = [0, 0]
        default: 
          return
      }
    })

    this.move()
  }

  private move() {
    this.player.x += this.moving[0]
    this.player.y += this.moving[1]
  }
}
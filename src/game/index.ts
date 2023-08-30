import { ICommand } from '@common/interfaces/ICommand'

export class Game {
  player = {x: 0, y: 0}
  moving = {
    left: 0,
    right: 0,
    top: 0,
    down: 0
  }

  get state() {
    return {
      player: this.player
    }
  }

  update(commands: ICommand[]) {
    commands.forEach(item => {
      switch(item.type) {
        case 'start_go_right': 
          this.moving.right = 1
          break;
        case 'stop_go_left':
          this.moving.left = 0
          break;
        case 'start_go_left': 
          this.moving.left = 1
          break;
        case 'stop_go_right': 
          this.moving.right = 0
          break;
        default: 
          return
      }
    })

    this.move()
  }

  private move() {
    this.player.x += this.moving.right
    this.player.x -= this.moving.left
  }
}
import { ICommand } from '@common/interfaces/ICommand'

export class Command implements ICommand {
  type: string

  constructor(command: string) {
    this.type = command
  }
}
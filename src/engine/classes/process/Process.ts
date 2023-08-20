import { IProcess } from '@engine/interfaces/IProcess'

export class Process implements IProcess {
  protected onload

  status = ''

  constructor(onload: (params: any) => void) {
    this.onload = onload
  }
}
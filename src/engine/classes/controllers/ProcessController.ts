import { SceneTypes } from '@common/types/Scene'
import { IController } from '@engine/interfaces/IController'
import { LoadingProcess } from '../process/LoadingProcess'
import { IProcess } from '@engine/interfaces/IProcess'
import { AppState } from '@common/types/AppState'

export class ProcessController implements IController<void> {
  private processes: {[key in SceneTypes]?: IProcess} = {}
  
  private addProcess(scene: SceneTypes) {
    let process
    switch(scene) {
      case SceneTypes.loading:
        process = new LoadingProcess()
        break
      case SceneTypes.game:
      case SceneTypes.menu:
      default:
        return
    }

    this.processes[scene] = process
  }

  get data() {
    return []
  }

  update(state: AppState) {
    if(!this.processes[state.scene.type]) {
      this.addProcess(state.scene.type)
    }
  }

  destroy() {}
}
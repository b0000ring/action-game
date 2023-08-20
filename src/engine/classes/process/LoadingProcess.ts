import { Process } from './Process'
import { ResourcesStorage } from '../storages/Resources';

// RESOURCES LOADING ONLY 
// IF SOME OTHER LOADING NEEDED CHANGE THIS
// TO SELECT PROPER LOADING TYPE 
export class LoadingProcess extends Process {
  private result = {}
  private start() {
    setTimeout(() => {
      this.end()
    }, 3000);
  }

  private end() {
    ResourcesStorage.store([])
    window.dispatchEvent(new CustomEvent('loading-complete', {}))
  }

  constructor() {
    super(() => {})

    this.start()
  }
}
import { IStorage } from '@engine/interfaces/IStorage'
import { Resource } from 'pixi.js'

const items: {[key: string]: Resource} = {}

export class ResourcesStorage implements IStorage<Resource> {
  static store(items: Resource[]) {
    console.log(items)
  }

  static get(id: string): Resource | null {
    if(items[id]) {
      return items[id]
    }

    return null
  }

  store() {

  }

  get(id: string) {
    return null
  }
}
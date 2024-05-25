import { map } from '@game/data/maps/actorsTags';

export function initialize(items: {tag: string, x: number, y:number, width?: number, height?: number}[]) {
  items.forEach(element => {
    const item = map[element.tag]

    if(item) {
      new item(element.x, element.y, element.width, element.height)
    }
   });
}
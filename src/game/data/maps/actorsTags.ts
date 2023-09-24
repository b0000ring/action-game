import { Actor } from '@game/classes/Actor'
import { Enemy } from '@game/classes/characters/Enemy'
import { Player } from '@game/classes/characters/Player'
import { Ground } from '@game/classes/objects/Ground'

export const map: {[key: string]: { new(x: number, y: number): Actor } } = {
  player: Player,
  ground: Ground,
  enemy: Enemy
}
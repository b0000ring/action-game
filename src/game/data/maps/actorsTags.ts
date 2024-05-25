import { Actor } from '@game/classes/Actor'
import { Enemy } from '@game/classes/characters/Enemy'
import { Player } from '@game/classes/characters/Player'
import { Ground } from '@game/classes/objects/Ground'
import { Spawn } from '@game/classes/objects/Spawn'

export const map: {[key: string]: { new(x: number, y: number, width?: number, height?: number): Actor } } = {
  player: Player,
  ground: Ground,
  enemy: Enemy,
  spawn: Spawn
}
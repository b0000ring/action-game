import { Actor } from "@game/classes/Actor";
import { Enemy } from "@game/classes/characters/Enemy";
import { Player } from "@game/classes/characters/Player";
import { Wall } from "@game/classes/objects/Wall";
import { Spawn } from "@game/classes/objects/Spawn";
import { Bush } from "@game/classes/objects/Bush";

export const map: {
  [key: string]: {
    new (x: number, y: number, width?: number, height?: number): Actor;
  };
} = {
  player: Player,
  wall: Wall,
  bush: Bush,
  enemy: Enemy,
  spawn: Spawn,
};

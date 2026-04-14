import { Direction } from "@game/types/Direction";
import { Modificators } from "./Modificators";

export type Actor = {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: Direction;
  modificators: Modificators;
};

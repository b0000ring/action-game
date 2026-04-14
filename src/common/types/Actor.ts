import { Modificators } from "./Modificators";

export type Actor = {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: 1 | 2 | 3 | 4;
  modificators: Modificators;
};

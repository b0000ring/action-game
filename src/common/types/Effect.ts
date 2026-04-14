import { Direction } from "@game/types/Direction";

export type Effect = {
  type: string;
  x?: number;
  y?: number;
  impulsex?: (power: number) => number;
  impulsey?: (power: number) => number;
  direction?: string;
  turning?: Direction;
  length?: number;
  damage?: number;
};

export type Effect = {
  type: string;
  x?: number;
  y?: number;
  impulsex?: (power: number) => number;
  impulsey?: (power: number) => number;
  direction?: string;
  turning?: 1 | 2 | 3 | 4;
  length?: number;
  damage?: number;
};

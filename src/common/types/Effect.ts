export type Effect = {
  type: string
  x?: number
  y?: number
  direction?: string
  turning?: 1 | -1
  length?: number
  damage?: number
}
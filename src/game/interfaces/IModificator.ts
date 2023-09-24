import { Effect } from '@common/types/Effect'

export interface IModificator {
  destroy: () => void
  apply: (effects: Effect[]) => void
  state?: {
    id: string
  } 
}
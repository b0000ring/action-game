import { AppState } from '@common/types/AppState'

export interface IController<T> {
  data: T[];
  destroy: () => void
  update: (params: AppState) => void
}
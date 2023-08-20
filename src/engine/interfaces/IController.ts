import { IAppState } from '@common/interfaces/IAppState'

export interface IController<T> {
  data: T[];
  destroy: () => void
  update: (params: IAppState) => void
}
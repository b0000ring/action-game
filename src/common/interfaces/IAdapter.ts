import { ICommand } from './ICommand'

export interface IAdapter<T> {
  data: T;
  subscribe: (commands: ICommand[]) => void;
}
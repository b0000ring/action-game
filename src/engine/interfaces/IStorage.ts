export interface IStorage<T> {
  get: (id: string) => T | null
  store: (items: T[]) => void
}
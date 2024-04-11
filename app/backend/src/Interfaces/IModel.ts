export interface IRead<T> {
  findAll(): T[];
  findById(id: number): T;
}

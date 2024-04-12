export interface IReadAll<T> {
  getAll(): Promise<T[]>;
}

export interface IReadById<T> {
  getById(id: number): Promise<T | null>;
}

export interface IReadByEmail<T> {
  getByEmail(email: string): Promise<T | null>;
}

export interface IReadByQuery<T> {
  getByQuery(query: string): Promise<T[]>;
}

export interface IRead<T> extends IReadAll<T>, IReadById<T> {}

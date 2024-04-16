export interface IReadAll<T> {
  getAll(): Promise<T[]>;
}

export interface IReadAllProgress<T> {
  getAllByProgress(progress: boolean): Promise<T[]>;
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

export interface IUpdate<T> {
  update(id: number, data: Partial<T>): Promise<Partial<T> | null>;
}

export interface IUpdateFinish {
  updateFinish(id: number): Promise<void>;
}

export interface createMatch<T> {
  createMatch(data: Omit<T, 'id' & 'inProgress'>): Promise<T>;
}

export interface IRead<T> extends IReadAll<T>, IReadById<T> {}

export interface IMatchModel<T> extends IReadAll<T>,
  IReadByQuery<T>, IUpdateFinish, IUpdate<T>, createMatch<T> {}

// export interface ILeaderBoard<T> extends IReadAllProgress<T> {}

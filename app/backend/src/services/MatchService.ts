import { ServiceResponse } from '../types/ServiceResponse';
import IMatch from '../Interfaces/IMatch';
import { IReadAll, IReadByQuery } from '../Interfaces/IModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private _matchModel: IReadAll<IMatch> & IReadByQuery<IMatch> = new MatchModel()) {}

  async getAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this._matchModel.getAll();
    return { status: 'successful', data: matches };
  }

  async getByQuery(query: string): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this._matchModel.getByQuery(query);
    return { status: 'successful', data: matches };
  }
}

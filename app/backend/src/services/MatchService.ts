import { ServiceResponse } from '../types/ServiceResponse';
import IMatch from '../Interfaces/IMatch';
import { IReadAll } from '../Interfaces/IModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private _matchModel: IReadAll<IMatch> = new MatchModel()) {}

  async getAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this._matchModel.getAll();
    return { status: 'successful', data: matches };
  }
}

import { ServiceResponse } from '../types/ServiceResponse';
import IMatch from '../Interfaces/IMatch';
import { IMatchModel } from '../Interfaces/IModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private _matchModel: IMatchModel<IMatch> = new MatchModel()) {}

  async getAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this._matchModel.getAll();
    return { status: 'successful', data: matches };
  }

  async getByQuery(query: string): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this._matchModel.getByQuery(query);
    return { status: 'successful', data: matches };
  }

  async updateFinish(id: number): Promise<ServiceResponse<{ message: string }>> {
    await this._matchModel.updateFinish(id);
    return { status: 'successful', data: { message: 'Finished' } };
  }

  async update(id: number, data: Partial<IMatch>): Promise<ServiceResponse<IMatch>> {
    const updatedMatch = await this._matchModel.update(id, data);
    if (!updatedMatch) {
      return { status: 'badRequest', data: { message: 'Match not found or match finished' } };
    }
    return { status: 'successful', data: updatedMatch };
  }
}

import SequelizeTeamModel from '../database/models/SequelizeTeamModel';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import IMatch from '../Interfaces/IMatch';
import { IReadAll, IReadByQuery } from '../Interfaces/IModel';

export default class MatchModel implements IReadAll<IMatch>, IReadByQuery<IMatch> {
  private _matchModel = SequelizeMatchModel;

  async getAll(): Promise<IMatch[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: SequelizeTeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async getByQuery(query: string): Promise<IMatch[]> {
    let whereCondition = {};
    if (query === 'true') {
      whereCondition = { inProgress: true };
    }
    if (query === 'false') {
      whereCondition = { inProgress: false };
    }

    const matches = await this._matchModel.findAll({
      where: whereCondition,
      include: [
        { model: SequelizeTeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }
}
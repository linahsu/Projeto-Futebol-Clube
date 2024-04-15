import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IReadAll } from '../Interfaces/IModel';
import { IMatchWithTeamNames } from '../Interfaces/IMatch';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

export default class LeaderBoardModel implements IReadAll<IMatchWithTeamNames> {
  private _matchModel = SequelizeMatchModel;

  async getAll(): Promise<IMatchWithTeamNames[]> {
    const finishedMatches = await this._matchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: SequelizeTeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return finishedMatches as unknown as IMatchWithTeamNames[];
  }
}

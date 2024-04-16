import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IReadAllProgress } from '../Interfaces/IModel';
import { IMatchWithTeamNames } from '../Interfaces/IMatch';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

export default class LeaderBoardModel implements IReadAllProgress<IMatchWithTeamNames> {
  private _matchModel = SequelizeMatchModel;

  async getAllByProgress(progress: boolean): Promise<IMatchWithTeamNames[]> {
    const finishedMatches = await this._matchModel.findAll({
      where: { inProgress: progress },
      include: [
        { model: SequelizeTeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return finishedMatches as unknown as IMatchWithTeamNames[];
  }
}

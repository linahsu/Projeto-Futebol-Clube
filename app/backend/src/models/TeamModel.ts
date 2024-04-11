import ITeam from '../Interfaces/ITeam';
import { IRead } from '../Interfaces/IModel';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

export default class TeamModel implements IRead<ITeam> {
  private _model = SequelizeTeamModel;

  async getAll(): Promise<ITeam[]> {
    const teams = await this._model.findAll();
    // return teams.map(({ id, teamName }) => ({ id, teamName }));
    return teams;
  }

  async getById(id: number): Promise<ITeam | null> {
    const team = await this._model.findOne({ where: { id } });
    if (!team) return null;
    return team;
  }
}

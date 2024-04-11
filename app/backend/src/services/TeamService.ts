import ITeam from '../Interfaces/ITeam';
// import { IRead } from '../Interfaces/IModel';
// import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../types/ServiceResponse';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

export default class TeamService {
  // constructor(private _teamModel: IRead<ITeam> = new TeamModel()) {}
  constructor(private _teamModel = SequelizeTeamModel) {}

  async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this._teamModel.findAll();
    return { status: 'successful', data: teams };
  }

  async getById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this._teamModel.findOne({ where: { id } });
    if (!team) {
      return { status: 'notFound', data: { message: 'Team not found' } };
    }
    return { status: 'successful', data: team };
  }
}

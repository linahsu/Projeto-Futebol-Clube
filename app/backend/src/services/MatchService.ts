import { ServiceResponse } from '../types/ServiceResponse';
import IMatch from '../Interfaces/IMatch';
import { IMatchModel } from '../Interfaces/IModel';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/ITeam';

function verifyTeams(homeTeamId: number, awayTeamId: number): boolean {
  return homeTeamId !== awayTeamId;
}

async function findMatchTeams(homeTeamId: number, awayTeamId: number): Promise<ITeam[]> {
  const teamModel = new TeamModel();
  const teams = await teamModel.getAll();
  const teamsMatchExists = teams
    .filter((team) => team.id === homeTeamId || team.id === awayTeamId);
  return teamsMatchExists;
}

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

  async update(id: number, data: Partial<IMatch>): Promise<ServiceResponse<Partial<IMatch>>> {
    const updatedMatch = await this._matchModel.update(id, data);
    if (!updatedMatch) {
      return { status: 'badRequest', data: { message: 'Match not found or match finished' } };
    }
    return { status: 'successful', data: updatedMatch };
  }

  async createMatch(data: Omit<IMatch, 'id' & 'inProgress'>): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = data;
    const matchTeamsExists = await findMatchTeams(homeTeamId, awayTeamId);

    if (!verifyTeams(homeTeamId, awayTeamId)) {
      return {
        status: 'unprocessableEntity',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    if (matchTeamsExists.length !== 2) {
      return { status: 'notFound', data: { message: 'There is no team with such id!' } };
    }

    const matchCreated = await this._matchModel.createMatch(data);
    return { status: 'created', data: matchCreated };
  }
}

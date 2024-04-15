import LeaderBoardModel from '../models/LeaderBoardModel';
import { IMatchWithTeamNames } from '../Interfaces/IMatch';
import { IReadAllProgress } from '../Interfaces/IModel';
import { ServiceResponse } from '../types/ServiceResponse';
import ILeaderBoard from '../Interfaces/ILeaderBoard';

const initialTeamResult = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

const initialHomeTeam: string[] = [];

function getPoints(homeGoals: number, awayGoals: number): { gameStatus: string, points: number } {
  let points = 0;
  let gameStatus = 'loss';
  if (homeGoals > awayGoals) {
    points = 3;
    gameStatus = 'victory';
  }
  if (homeGoals === awayGoals) {
    points = 1;
    gameStatus = 'draw';
  }
  return { gameStatus, points };
}

function getTeamResult(currentTeamMatches: IMatchWithTeamNames[]): ILeaderBoard {
  const teamResult = currentTeamMatches.reduce((acc, match) => {
    const { gameStatus, points } = getPoints(match.homeTeamGoals, match.awayTeamGoals);

    const result = {
      name: match.homeTeam.teamName,
      totalPoints: acc.totalPoints + points,
      totalGames: acc.totalGames + 1,
      totalVictories: gameStatus === 'victory' ? acc.totalVictories + 1 : acc.totalVictories,
      totalDraws: gameStatus === 'draw' ? acc.totalDraws + 1 : acc.totalDraws,
      totalLosses: gameStatus === 'loss' ? acc.totalLosses + 1 : acc.totalLosses,
      goalsFavor: acc.goalsFavor + match.homeTeamGoals,
      goalsOwn: acc.goalsOwn + match.awayTeamGoals,
    };

    return result;
  }, initialTeamResult);

  return teamResult;
}

export default class LeaderBoardService {
  constructor(
    private _leaderBoardModel: IReadAllProgress<IMatchWithTeamNames> = new LeaderBoardModel(),
  ) { }

  async getTeamsByProgress(progress: boolean):
  Promise<{ finishedMatches: IMatchWithTeamNames[], homeTeams: string[] }> {
    const finishedMatches = await this._leaderBoardModel.getAll(progress);

    const homeTeams = finishedMatches.reduce((acc, match) => {
      if (!acc.includes(match.homeTeam.teamName)) {
        return [...acc, match.homeTeam.teamName];
      }
      return acc;
    }, initialHomeTeam);

    return { finishedMatches, homeTeams };
  }

  async getHomeTeamsPerformance(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const { finishedMatches, homeTeams } = await this.getTeamsByProgress(false);

    const getHomeTeamsPerformance = homeTeams.map((team) => {
      const currentTeamMatches = finishedMatches
        .filter((match) => match.homeTeam.teamName === team);

      const teamResult = getTeamResult(currentTeamMatches);

      return teamResult;
    });

    return { status: 'successful', data: getHomeTeamsPerformance };
  }
}

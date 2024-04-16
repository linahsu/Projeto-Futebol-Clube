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
  goalsBalance: 0,
  efficiency: 0,
};

const initialTeam: string[] = [];

export type TeamType = 'homeTeam' | 'awayTeam';

function getHomePoints(homeGoals: number, awayGoals: number): {
  gameStatus: string, points: number } {
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

function getAwayPoints(homeGoals: number, awayGoals: number): {
  gameStatus: string, points: number } {
  let points = 0;
  let gameStatus = 'loss';
  if (homeGoals < awayGoals) {
    points = 3;
    gameStatus = 'victory';
  }
  if (homeGoals === awayGoals) {
    points = 1;
    gameStatus = 'draw';
  }
  return { gameStatus, points };
}

function getHomeTeamResult(currentTeamMatches: IMatchWithTeamNames[]): ILeaderBoard {
  const teamResult = currentTeamMatches.reduce((acc, match) => {
    const { gameStatus, points } = getHomePoints(match.homeTeamGoals, match.awayTeamGoals);

    const result = {
      ...acc,
      name: match.homeTeam.teamName,
      totalPoints: acc.totalPoints + points,
      totalGames: acc.totalGames + 1,
      totalVictories: gameStatus === 'victory' ? acc.totalVictories + 1 : acc.totalVictories,
      totalDraws: gameStatus === 'draw' ? acc.totalDraws + 1 : acc.totalDraws,
      totalLosses: gameStatus === 'loss' ? acc.totalLosses + 1 : acc.totalLosses,
      goalsFavor: acc.goalsFavor + match.homeTeamGoals,
      goalsOwn: acc.goalsOwn + match.awayTeamGoals,
    };

    result.goalsBalance = result.goalsFavor - result.goalsOwn;
    result.efficiency = Number(((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2));

    return result;
  }, initialTeamResult);

  return teamResult;
}

function getAwayTeamResult(currentTeamMatches: IMatchWithTeamNames[]): ILeaderBoard {
  const teamResult = currentTeamMatches.reduce((acc, match) => {
    const { gameStatus, points } = getAwayPoints(match.homeTeamGoals, match.awayTeamGoals);

    const result = {
      ...acc,
      name: match.awayTeam.teamName,
      totalPoints: acc.totalPoints + points,
      totalGames: acc.totalGames + 1,
      totalVictories: gameStatus === 'victory' ? acc.totalVictories + 1 : acc.totalVictories,
      totalDraws: gameStatus === 'draw' ? acc.totalDraws + 1 : acc.totalDraws,
      totalLosses: gameStatus === 'loss' ? acc.totalLosses + 1 : acc.totalLosses,
      goalsFavor: acc.goalsFavor + match.awayTeamGoals,
      goalsOwn: acc.goalsOwn + match.homeTeamGoals,
    };

    result.goalsBalance = result.goalsFavor - result.goalsOwn;
    result.efficiency = Number(((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2));

    return result;
  }, initialTeamResult);

  return teamResult;
}

export default class LeaderBoardService {
  constructor(
    private _leaderBoardModel: IReadAllProgress<IMatchWithTeamNames> = new LeaderBoardModel(),
  ) { }

  async getTeamsByProgressAndType(progress: boolean, teamType: keyof IMatchWithTeamNames):
  Promise<{ finishedMatches: IMatchWithTeamNames[], teams: string[] }> {
    const finishedMatches = await this._leaderBoardModel.getAllByProgress(progress);

    const teams = finishedMatches.reduce((acc, match) => {
      if (!acc.includes((match[teamType] as { teamName: string }).teamName)) {
        return [...acc, (match[teamType] as { teamName: string }).teamName];
      }
      return acc;
    }, initialTeam);

    return { finishedMatches, teams };
  }

  async getTeamsPerformance(
    teamType: keyof IMatchWithTeamNames,
  ): Promise<ServiceResponse<ILeaderBoard[]>> {
    const { finishedMatches, teams } = await this.getTeamsByProgressAndType(false, teamType);

    const getTeamsPerformance = teams.map((team) => {
      const currentTeamMatches = finishedMatches
        .filter((match) => (match[teamType] as { teamName: string }).teamName === team);

      let teamResult: ILeaderBoard = initialTeamResult;
      if (teamType === 'homeTeam') teamResult = getHomeTeamResult(currentTeamMatches);
      if (teamType === 'awayTeam') teamResult = getAwayTeamResult(currentTeamMatches);

      return teamResult;
    });

    getTeamsPerformance
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return { status: 'successful', data: getTeamsPerformance };
  }
}

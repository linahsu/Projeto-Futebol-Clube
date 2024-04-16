import LeaderBoardModel from '../models/LeaderBoardModel';
import { IMatchWithTeamNames } from '../Interfaces/IMatch';
import { IReadAllProgress } from '../Interfaces/IModel';
import { ServiceResponse, ServiceResponseSuccessful } from '../types/ServiceResponse';
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

const initialTeamArray: string[] = [];

function getHomePoints(homeGoals: number, awayGoals: number): {
  gameStatus: string, points: number
} {
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
  gameStatus: string, points: number
} {
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

function getAllTeamsName(homeAndAwayTeams: ILeaderBoard[]): string[] {
  const teams = homeAndAwayTeams.reduce((acc, team) => {
    if (!initialTeamArray.includes(team.name)) {
      return [...acc, team.name];
    }
    return acc;
  }, initialTeamArray);

  return teams;
}

function getTeamResult(currentTeamPerformances: ILeaderBoard[]): ILeaderBoard {
  const teamFinalResult = currentTeamPerformances.reduce((acc, performance) => {
    const result = {
      ...acc,
      name: performance.name,
      totalPoints: acc.totalPoints + performance.totalPoints,
      totalGames: acc.totalGames + performance.totalGames,
      totalVictories: acc.totalVictories + performance.totalVictories,
      totalDraws: acc.totalDraws + performance.totalDraws,
      totalLosses: acc.totalLosses + performance.totalLosses,
      goalsFavor: acc.goalsFavor + performance.goalsFavor,
      goalsOwn: acc.goalsOwn + performance.goalsOwn,
    };

    result.goalsBalance = result.goalsFavor - result.goalsOwn;
    result.efficiency = Number(((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2));

    return result;
  }, initialTeamResult);

  return teamFinalResult;
}

export default class LeaderBoardService {
  constructor(
    private _leaderBoardModel: IReadAllProgress<IMatchWithTeamNames> = new LeaderBoardModel(),
  ) { }

  async getTeamsNameByProgressAndType(progress: boolean, teamType: keyof IMatchWithTeamNames):
  Promise<{ finishedMatches: IMatchWithTeamNames[], teams: string[] }> {
    const finishedMatches = await this._leaderBoardModel.getAllByProgress(progress);

    const teams = finishedMatches.reduce((acc, match) => {
      if (!acc.includes((match[teamType] as { teamName: string }).teamName)) {
        return [...acc, (match[teamType] as { teamName: string }).teamName];
      }
      return acc;
    }, initialTeamArray);

    return { finishedMatches, teams };
  }

  async getTeamsPerformanceByType(
    teamType: keyof IMatchWithTeamNames,
  ): Promise<ServiceResponseSuccessful<ILeaderBoard[]>> {
    const { finishedMatches, teams } = await this.getTeamsNameByProgressAndType(false, teamType);

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

  async getAllTeamsPerformance(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const homeTeams = (await this.getTeamsPerformanceByType('homeTeam')).data;
    const awayTeams = (await this.getTeamsPerformanceByType('awayTeam')).data;
    const homeAndAwayTeams = [...homeTeams, ...awayTeams];
    console.log(homeAndAwayTeams);
    const allTeamsName = getAllTeamsName(homeAndAwayTeams);
    console.log(allTeamsName);

    const getAllTeamsPerformance = allTeamsName.map((team) => {
      const currentTeamPerformances = homeAndAwayTeams
        .filter((teamPerformance) => teamPerformance.name === team);

      const teamFinalResult: ILeaderBoard = getTeamResult(currentTeamPerformances);

      return teamFinalResult;
    });

    getAllTeamsPerformance
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return { status: 'successful', data: getAllTeamsPerformance };
  }
}

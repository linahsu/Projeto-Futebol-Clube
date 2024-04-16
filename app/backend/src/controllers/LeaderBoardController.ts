import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import mapStatusHttps from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(private _leaderBoardService = new LeaderBoardService()) {}

  async getHomeTeamsPerformance(_req: Request, res: Response) {
    const { status, data } = await this._leaderBoardService.getTeamsPerformanceByType('homeTeam');
    return res.status(mapStatusHttps(status)).json(data);
  }

  async getAwayTeamsPerformance(_req: Request, res: Response) {
    const { status, data } = await this._leaderBoardService.getTeamsPerformanceByType('awayTeam');
    return res.status(mapStatusHttps(status)).json(data);
  }

  async getAllTeamsPerformance(_req: Request, res: Response) {
    const { status, data } = await this._leaderBoardService.getAllTeamsPerformance();
    return res.status(mapStatusHttps(status)).json(data);
  }
}

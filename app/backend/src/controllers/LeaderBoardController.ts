import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import mapStatusHttps from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(private _leaderBoardService = new LeaderBoardService()) {}

  async getHomeTeamsPerformance(req: Request, res: Response) {
    const { status, data } = await this._leaderBoardService.getTeamsPerformance('homeTeam');
    return res.status(mapStatusHttps(status)).json(data);
  }

  async getAwayTeamsPerformance(req: Request, res: Response) {
    const { status, data } = await this._leaderBoardService.getTeamsPerformance('awayTeam');
    return res.status(mapStatusHttps(status)).json(data);
  }
}

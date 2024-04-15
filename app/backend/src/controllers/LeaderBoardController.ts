import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import mapStatusHttps from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(private _leaderBoardService = new LeaderBoardService()) {}

  async getHomeTeamsPerformance(req: Request, res: Response) {
    const { status, data } = await this._leaderBoardService.getHomeTeamsPerformance();
    return res.status(mapStatusHttps(status)).json(data);
  }
}

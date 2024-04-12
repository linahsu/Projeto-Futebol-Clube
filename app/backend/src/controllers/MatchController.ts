import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHttps from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private _matchService = new MatchService()) {}

  async getAll(_req: Request, res: Response) {
    const { status, data } = await this._matchService.getAll();
    return res.status(mapStatusHttps(status)).json(data);
  }
}

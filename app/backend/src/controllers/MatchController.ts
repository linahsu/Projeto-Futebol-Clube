import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHttps from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private _matchService = new MatchService()) {}

  async getAll(req: Request, res: Response) {
    const query = req.query.inProgress as string;
    if (query) {
      const { status, data } = await this._matchService.getByQuery(query);
      return res.status(mapStatusHttps(status)).json(data);
    }
    const { status, data } = await this._matchService.getAll();
    return res.status(mapStatusHttps(status)).json(data);
  }
}

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

  async updateFinish(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this._matchService.updateFinish(Number(id));
    return res.status(mapStatusHttps(status)).json(data);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;
    const { status, data } = await this._matchService.update(Number(id), updateData);
    return res.status(mapStatusHttps(status)).json(data);
  }

  async createMatch(req: Request, res: Response) {
    const { status, data } = await this._matchService.createMatch(req.body);
    return res.status(mapStatusHttps(status)).json(data);
  }
}

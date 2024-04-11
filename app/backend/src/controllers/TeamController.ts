import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(private _teamService = new TeamService()) {}

  async getAll(_req: Request, res: Response) {
    const { status, data } = await this._teamService.getAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this._teamService.getById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}

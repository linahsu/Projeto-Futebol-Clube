import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import mapStatusHttps from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(private _loginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { status, data } = await this._loginService.login(req.body);
    return res.status(mapStatusHttps(status)).json(data);
  }
}

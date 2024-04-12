import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import mapStatusHttps from '../utils/mapStatusHTTP';
import IUser from '../Interfaces/IUser';

export default class LoginController {
  private _user!: IUser;

  constructor(private _loginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { status, data } = await this._loginService.login(req.body);
    return res.status(mapStatusHttps(status)).json(data);
  }

  getUserRole(_req: Request, res: Response) {
    this._user = res.locals.user;
    const { role } = this._user;
    return res.status(200).json({ role });
  }
}

import * as bcrypt from 'bcryptjs';
import IUser from '../Interfaces/IUser';
import UserModel from '../models/UserModel';
import { IReadByEmail } from '../Interfaces/IModel';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token, Login, Payload } from '../types/login';
import tokenUtils from '../utils/tokenUtils';
import validateLoginInputs from './validations/validateLoginInputs';

export default class LoginService {
  constructor(private _userModel: IReadByEmail<IUser> = new UserModel()) {}

  async login(loginData: Login): Promise<ServiceResponse<Token>> {
    const error = validateLoginInputs(loginData);
    const user = await this._userModel.getByEmail(loginData.email);
    if (error || !user) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const payload: Payload = {
      id: user.id,
      username: user.username,
    };

    const token = tokenUtils.createToken(payload);

    return { status: 'successful', data: { token } };
  }
}

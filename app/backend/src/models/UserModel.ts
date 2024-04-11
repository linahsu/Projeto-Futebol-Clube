import { IReadByEmail } from '../Interfaces/IModel';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
import IUser from '../Interfaces/IUser';

export default class UserModel implements IReadByEmail<IUser> {
  private _userModel = SequelizeUserModel;

  async getByEmail(email: string): Promise<IUser | null> {
    const user = await this._userModel.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}

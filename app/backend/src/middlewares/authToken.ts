import { NextFunction, Request, Response } from 'express';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
import tokenUtils from '../utils/tokenUtils';

export default async function authToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = authorization.split(' ')[1];

  try {
    const userPayload = tokenUtils.verifyToken(token);
    const user = await SequelizeUserModel.findOne({ where: { id: userPayload.id } });
    if (!user) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    res.locals.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

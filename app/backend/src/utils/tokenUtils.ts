import * as jwt from 'jsonwebtoken';
import { Payload } from '../types/login';

const secret = process.env.JWT_SECRET || 'jwt_secret';

function createToken(payload: Payload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verifyToken(token: string): Payload {
  const payload = jwt.verify(token, secret) as Payload;
  return payload;
}

export default {
  createToken,
  verifyToken,
};

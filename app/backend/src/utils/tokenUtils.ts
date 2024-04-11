import jwt from 'jsonwebtoken';
import { Payload } from '../types/login';

const secret = process.env.JWT_SECRET;

function createToken(payload: Payload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verifyToken(token: string): Payload {
  const payload = jwt.verify(token, secret);
  return payload;
}

export default {
  createToken,
  verifyToken,
};

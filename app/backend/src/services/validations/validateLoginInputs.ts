import { Login } from '../../types/login';
import Schemas from './Schemas';

export default function validateLoginInputs(loginData: Login): boolean {
  const { error } = Schemas.loginSchema.validate(loginData);
  if (error) return true;
  return false;
}

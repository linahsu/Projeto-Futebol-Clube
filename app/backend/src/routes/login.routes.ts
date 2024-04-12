import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginControlles';
import verifyLoginInputs from '../middlewares/verifyLoginInputs';
import authToken from '../middlewares/authToken';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  verifyLoginInputs,
  (req: Request, res: Response) => loginController.login(req, res),
);
loginRouter.get(
  '/role',
  authToken,
  (req: Request, res: Response) => loginController.getUserRole(req, res),
);

export default loginRouter;

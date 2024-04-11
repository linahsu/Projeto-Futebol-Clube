import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginControlles';
import verifyLoginInputs from '../middlewares/verifyLoginInputs';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  verifyLoginInputs,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default loginRouter;

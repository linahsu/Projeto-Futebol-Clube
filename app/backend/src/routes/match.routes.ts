import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import authToken from '../middlewares/authToken';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (req: Request, res: Response) => matchController.getAll(req, res));
matchRouter.patch(
  '/:id',
  authToken,
  (req: Request, res: Response) => matchController.update(req, res),
);
matchRouter.patch(
  '/:id/finish',
  authToken,
  (req: Request, res: Response) => matchController.updateFinish(req, res),
);
matchRouter.post(
  '/',
  authToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default matchRouter;

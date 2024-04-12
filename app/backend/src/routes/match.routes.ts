import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (req: Request, res: Response) => matchController.getAll(req, res));

export default matchRouter;

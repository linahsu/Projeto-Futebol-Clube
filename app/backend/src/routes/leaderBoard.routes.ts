import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = Router();
const leaderBoardController = new LeaderBoardController();

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getHomeTeamsPerformance(req, res),
);
leaderBoardRouter.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getAwayTeamsPerformance(req, res),
);

export default leaderBoardRouter;

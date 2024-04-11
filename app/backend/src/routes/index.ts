import { Router } from 'express';
import teamRouter from './team.routes';
import loginRouter from './login.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);

export default router;

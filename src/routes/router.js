import { Router } from 'express';
import employeesRouter from './employeesRouter.js';
import branchesRouter from './branchesRouter.js';
import votingRouter from './votingRouter.js';

const router = Router();

router.use('/employees', employeesRouter);

router.use('/branches', branchesRouter);

router.use('/voting', votingRouter);

export default router;
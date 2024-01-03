import { Router } from 'express';
import employeesRouter from './employeesRouter.js';
import branchesRouter from './branchesRouter.js';

const router = Router();

router.use('/employees', employeesRouter);

router.use('/branches', branchesRouter);

export default router;
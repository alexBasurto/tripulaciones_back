import { Router } from 'express';
import employeesRouter from './employeesRouter.js';
import branchesRouter from './branchesRouter.js';
import companiesRouter from './companiesRouter.js';

const router = Router();

router.use('/employees', employeesRouter);

router.use('/branches', branchesRouter);
router.use('/companies', companiesRouter);

export default router;
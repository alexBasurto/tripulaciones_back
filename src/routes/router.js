import { Router } from 'express';
import employeesRouter from './employeesRouter.js';
import departmentsRouter from './departmentsRouter.js';
import reportsRouter from './reportsRouter.js';
import branchesRouter from './branchesRouter.js';

const router = Router();

router.use('/employees', employeesRouter);
router.use('/departments', departmentsRouter);
router.use('/reports', reportsRouter);


router.use('/branches', branchesRouter);

export default router;
import { Router } from 'express';
import employeesRouter from './employeesRouter.js';
import departmentsRouter from './departmentsRouter.js';
import commentsRouter from './commentsRouter.js';
import branchesRouter from './branchesRouter.js';

const router = Router();

router.use('/employees', employeesRouter);
router.use('/departments', departmentsRouter);
router.use('/comments', reportsRouter);


router.use('/branches', branchesRouter);

export default router;
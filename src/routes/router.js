import { Router } from 'express';
import employeesRouter from './employeesRouter.js';
import departmentsRouter from './departmentsRouter.js';
import commentsRouter from './commentsRouter.js';
import branchesRouter from './branchesRouter.js';
import companiesRouter from './companiesRouter.js';
import votingRouter from './votingRouter.js';
import feelingsRouter from './feelingsRouter.js';

const router = Router();

router.use('/employees', employeesRouter);

router.use('/departments', departmentsRouter);

router.use('/comments', commentsRouter);

router.use('/feelings', feelingsRouter);

router.use('/branches', branchesRouter);

router.use('/companies', companiesRouter);

router.use('/employees', employeesRouter);

router.use('/branches', branchesRouter);

router.use('/voting', votingRouter);

export default router;
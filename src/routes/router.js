import { Router } from 'express';
import employeesRouter from './employeesRouter.js';
import departmentsRouter from './departmentsRouter.js';
import commentsRouter from './commentsRouter.js';
import branchesRouter from './branchesRouter.js';
import companiesRouter from './companiesRouter.js';
import votingRouter from './votingRouter.js';
import feelingsRouter from './feelingsRouter.js';
import reasonsRouter from './reasonsRouter.js';
import shiftsRouter from './shiftsRouter.js';
import scoresRouter from './scoresRouter.js';
import authRouter from './authRouter.js';
import dataRouter from './dataRouter.js';

const router = Router();

router.use('/employees', employeesRouter);

router.use('/departments', departmentsRouter);

router.use('/comments', commentsRouter);

router.use('/feelings', feelingsRouter);

router.use('/reasons', reasonsRouter);
router.use('/shifts', shiftsRouter);
router.use('/companies', companiesRouter);
router.use('/scores', scoresRouter);
router.use('/branches', branchesRouter);
router.use('/voting', votingRouter);
router.use("/", authRouter);

router.use("/data", dataRouter);

export default router;
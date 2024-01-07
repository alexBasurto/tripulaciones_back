import { Router } from 'express';
import employeesRouter from './employeesRouter.js';
import branchesRouter from './branchesRouter.js';
import companiesRouter from './companiesRouter.js';
import votingRouter from './votingRouter.js';
import shiftsRouter from './shiftsRouter.js';
import scoresRouter from './scoresRouter.js';
import authRouter from './authRouter.js';

const router = Router();

router.use('/employees', employeesRouter);
router.use('/shifts', shiftsRouter);
router.use('/companies', companiesRouter);
router.use('/scores', scoresRouter);
router.use('/branches', branchesRouter);
router.use('/voting', votingRouter);
router.use("/", authRouter);

export default router;
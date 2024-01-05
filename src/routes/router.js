import { Router } from 'express';
import employeesRouter from './employeesRouter.js';
import shiftsRouter from './shiftsRouter.js';
import companiesRouter from './companiesRouter.js';
import scoresRouter from './scoresRouter.js';

const router = Router();

router.use('/employees', employeesRouter);
router.use('/shifts', shiftsRouter);
router.use('/companies', companiesRouter);
router.use('/scores', scoresRouter);

export default router;
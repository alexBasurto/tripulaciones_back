import { Router } from 'express';
import employeesRouter from './employeesRouter.js';
import companiesRouter from './companiesRouter.js';

const router = Router();

router.use('/employees', employeesRouter);
router.use('/companies', companiesRouter);

export default router;
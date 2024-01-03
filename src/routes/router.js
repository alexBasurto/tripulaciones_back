import { Router } from 'express';
import employeesRouter from './employeesRouter.js';
import departmentsRouter from './departmentsRouter.js';
import reportsRouter from './reportsRouter.js';

const router = Router();

router.use('/employees', employeesRouter);
router.use('/departments', departmentsRouter);
router.use('/reports', reportsRouter);


export default router;
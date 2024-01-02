import { Router } from 'express';
import employeesRouter from './employeesRouter.js';

const router = Router();

router.use('/employees', employeesRouter);

export default router;
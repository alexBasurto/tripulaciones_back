import { Router } from 'express';
import employeesRouter from './employeesRouter.js';

const router = Router();

router.use('/employees', employeesRouter);
router.get('/test', (req, res) => {
    res.send('Test OK');
});

export default router;
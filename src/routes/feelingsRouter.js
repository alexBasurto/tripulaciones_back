import { Router } from 'express';
import feelingsController from '../controllers/feelingsController.js';

const feelingsRouter = Router();

feelingsRouter.get('/',(req, res) => {
    feelingsController.getAll(req, res)
});

feelingsRouter.get('/:id',(req, res) => {
    feelingsController.getById(req, res)
});

export default feelingsRouter;
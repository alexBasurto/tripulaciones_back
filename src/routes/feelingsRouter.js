import { Router } from 'express';

import { isAuthenticated } from '../middlewares/authMiddleware.js';
import feelingsController from '../controllers/feelingsController.js';

const feelingsRouter = Router();

feelingsRouter.get('/', isAuthenticated, (req, res) => {
    feelingsController.getAll(req, res)
});

feelingsRouter.get('/:id', isAuthenticated, (req, res) => {
    feelingsController.getById(req, res)
});

export default feelingsRouter;
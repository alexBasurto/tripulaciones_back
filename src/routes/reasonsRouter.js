import { Router } from 'express';

import { isAuthenticated } from '../middlewares/authMiddleware.js';
import reasonsController from '../controllers/reasonsController.js';

const reasonsRouter = Router();

reasonsRouter.get('/', isAuthenticated, (req, res) => {
    reasonsController.getAll(req, res);
});

reasonsRouter.get('/:id', isAuthenticated, (req, res) => {
    reasonsController.getById(req, res);
});

export default reasonsRouter;
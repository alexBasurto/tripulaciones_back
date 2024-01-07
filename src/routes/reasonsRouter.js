import { Router } from 'express';

import reasonsController from '../controllers/reasonsController.js';

const reasonsRouter = Router();

reasonsRouter.get('/', (req, res) => {
    reasonsController.getAll(req, res);
});

reasonsRouter.get('/:id', (req, res) => {
    reasonsController.getById(req, res);
});

export default reasonsRouter;
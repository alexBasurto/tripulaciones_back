import { Router } from 'express';

import { isAuthenticated } from '../middlewares/authMiddleware.js';
import scoresController from '../controllers/scoresController.js';

const scoresRouter = Router();

scoresRouter.get ('/', isAuthenticated, (req, res) => {
    scoresController.getAll(req, res);
}
);

scoresRouter.get('/:id', isAuthenticated, (req, res) => {
    scoresController.getById(req, res);
});

export default scoresRouter;
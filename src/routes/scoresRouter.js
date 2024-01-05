import { Router } from 'express';
import scoresController from '../controllers/scoresController.js';

const scoresRouter = Router();

scoresRouter.get ('/', (req, res) => {
    scoresController.getAll(req, res);
}
);

scoresRouter.get('/:id', (req, res) => {
    scoresController.getById(req, res);
});

export default scoresRouter;
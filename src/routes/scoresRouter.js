import { Router } from 'express';
import scoresController from '../controllers/scoresController.js';

const scoresRouter = Router();

scoresRouter.get('/', scoresController.readAll);

export default scoresRouter;
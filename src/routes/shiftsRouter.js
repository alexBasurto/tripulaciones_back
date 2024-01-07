import { Router } from 'express';

import shiftsController from '../controllers/shiftsController.js';

const shiftsRouter = Router();

shiftsRouter.get ('/', (req, res) => {
    shiftsController.getAll(req, res);
}
);

shiftsRouter.get('/:id', (req, res) => {
    shiftsController.getById(req, res);
});

shiftsRouter.post('/new', (req, res) => {
    shiftsController.create(req, res);
});

shiftsRouter.put('/:id', (req, res) => {
    shiftsController.update(req, res);
});

shiftsRouter.delete('/:id', (req, res) => {
    shiftsController.remove(req, res);
});

export default shiftsRouter;
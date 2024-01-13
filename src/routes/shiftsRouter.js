import { Router } from 'express';

import { isAuthenticated, isAdministrator } from '../middlewares/authMiddleware.js';
import shiftsController from '../controllers/shiftsController.js';

const shiftsRouter = Router();

shiftsRouter.get ('/', isAuthenticated, isAdministrator, (req, res) => {
    shiftsController.getAll(req, res);
}
);

shiftsRouter.get('/:id', isAuthenticated, (req, res) => {
    shiftsController.getById(req, res);
});

shiftsRouter.post('/new', isAuthenticated, isAdministrator, (req, res) => {
    shiftsController.create(req, res);
});

shiftsRouter.put('/:id', isAuthenticated, isAdministrator, (req, res) => {
    shiftsController.update(req, res);
});

shiftsRouter.delete('/:id', isAuthenticated, isAdministrator, (req, res) => {
    shiftsController.remove(req, res);
});

export default shiftsRouter;
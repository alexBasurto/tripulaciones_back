import { Router } from 'express';

import { isAuthenticated } from '../middlewares/authMiddleware.js';
import branchesController from '../controllers/branchesController.js';

const branchesRouter = Router();

branchesRouter.get ('/', isAuthenticated, (req, res) => {
    branchesController.getAll(req, res);
}
);

branchesRouter.get ('/:id', isAuthenticated, (req, res) => {
    branchesController.getById(req, res);
}
);

branchesRouter.post('/new', isAuthenticated, (req, res) => {
    branchesController.create(req, res);
}
);

branchesRouter.put('/:id', isAuthenticated, (req, res) => {
    branchesController.update(req, res);
}
);

branchesRouter.delete('/:id', isAuthenticated, (req, res) => {
    branchesController.remove(req, res);
}
);

export default branchesRouter;
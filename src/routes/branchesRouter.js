import { Router } from 'express';

import { isAuthenticated, isAdministrator } from '../middlewares/authMiddleware.js';
import branchesController from '../controllers/branchesController.js';

const branchesRouter = Router();

branchesRouter.get ('/', isAuthenticated, isAdministrator, (req, res) => {
    branchesController.getAll(req, res);
}
);

branchesRouter.get ('/:id', isAuthenticated, (req, res) => {
    branchesController.getById(req, res);
}
);

branchesRouter.post('/new', isAuthenticated, isAdministrator, (req, res) => {
    branchesController.create(req, res);
}
);

branchesRouter.put('/:id', isAuthenticated,  isAdministrator,(req, res) => {
    branchesController.update(req, res);
}
);

branchesRouter.delete('/:id', isAuthenticated, isAdministrator, (req, res) => {
    branchesController.remove(req, res);
}
);

export default branchesRouter;
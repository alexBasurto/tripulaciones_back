import { Router } from 'express';

import branchesController from '../controllers/branchesController.js';

const branchesRouter = Router();

branchesRouter.get ('/', (req, res) => {
    branchesController.getAll(req, res);
}
);

branchesRouter.get ('/:id', (req, res) => {
    branchesController.getById(req, res);
}
);

branchesRouter.post('/new', (req, res) => {
    branchesController.create(req, res);
}
);

branchesRouter.put('/:id', (req, res) => {
    branchesController.update(req, res);
}
);

branchesRouter.delete('/:id', (req, res) => {
    branchesController.remove(req, res);
}
);

export default branchesRouter;
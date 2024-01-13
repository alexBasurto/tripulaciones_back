import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

import companiesController from '../controllers/companiesController.js';

const companiesRouter = Router();

companiesRouter.get ('/', isAuthenticated, (req, res) => {
    companiesController.getAll(req, res);
}
);

companiesRouter.get ('/:id', isAuthenticated, (req, res) => {
    companiesController.getById(req, res);
}
);

companiesRouter.post('/new', isAuthenticated, (req, res) => {
    companiesController.create(req, res);
}
);

companiesRouter.put('/:id', isAuthenticated, (req, res) => {
    companiesController.update(req, res);
}
);

companiesRouter.delete('/:id', isAuthenticated, (req, res) => {
    companiesController.remove(req, res);
}
);

export default companiesRouter;
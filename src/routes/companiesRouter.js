import { Router } from 'express';
import { isAuthenticated, isAdministrator, isSuperAdministrator } from '../middlewares/authMiddleware.js';

import companiesController from '../controllers/companiesController.js';

const companiesRouter = Router();

companiesRouter.get ('/', isAuthenticated, isSuperAdministrator, (req, res) => {
    companiesController.getAll(req, res);
}
);

companiesRouter.get ('/:id', isAuthenticated, (req, res) => {
    companiesController.getById(req, res);
}
);

companiesRouter.post('/new', isAuthenticated, isAdministrator, (req, res) => {
    companiesController.create(req, res);
}
);

companiesRouter.put('/:id', isAuthenticated, isAdministrator, (req, res) => {
    companiesController.update(req, res);
}
);

companiesRouter.delete('/:id', isAuthenticated, isAdministrator, (req, res) => {
    companiesController.remove(req, res);
}
);

export default companiesRouter;
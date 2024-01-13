import { Router } from 'express';

import { isAuthenticated } from '../middlewares/authMiddleware.js';
import employeesController from '../controllers/employeesController.js';

const employeesRouter = Router();

employeesRouter.get ('/', isAuthenticated, (req, res) => {
    employeesController.getAll(req, res);
}
);

employeesRouter.get ('/:id', isAuthenticated, (req, res) => {
    employeesController.getById(req, res);
}
);

employeesRouter.post('/new', isAuthenticated, (req, res) => {
    employeesController.create(req, res);
}
);

employeesRouter.put('/:id', isAuthenticated, (req, res) => {
    employeesController.update(req, res);
}
);

employeesRouter.delete('/:id', isAuthenticated, (req, res) => {
    employeesController.remove(req, res);
}
);

export default employeesRouter;
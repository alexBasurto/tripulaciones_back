import { Router } from 'express';
import { isAuthenticated, isAdministrator } from '../middlewares/authMiddleware.js';

import departmentsController from '../controllers/departmentsController.js';

const departmentsRouter = Router();

departmentsRouter.get ('/', isAuthenticated, isAdministrator, (req, res) => {
    departmentsController.getAll(req, res);
}
);

departmentsRouter.get ('/:id', isAuthenticated, (req, res) => {
    departmentsController.getById(req, res);
}
);

departmentsRouter.post('/new', isAuthenticated, isAdministrator, (req, res) => {
    departmentsController.create(req, res);
}
);

departmentsRouter.put('/:id', isAuthenticated, isAdministrator, (req, res) => {
    departmentsController.update(req, res);
}
);

departmentsRouter.delete('/:id', isAuthenticated, isAdministrator, (req, res) => {
    departmentsController.remove(req, res);
}
);

export default departmentsRouter;
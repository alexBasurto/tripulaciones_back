import { Router } from 'express';

import employeesController from '../controllers/employeesController.js';

const employeesRouter = Router();

employeesRouter.get ('/', (req, res) => {
    employeesController.getAll(req, res);
}
);

employeesRouter.get ('/:id', (req, res) => {
    employeesController.getById(req, res);
}
);

employeesRouter.post('/new', (req, res) => {
    employeesController.create(req, res);
}
);

employeesRouter.put('/:id', (req, res) => {
    employeesController.update(req, res);
}
);

employeesRouter.delete('/:id', (req, res) => {
    employeesController.remove(req, res);
}
);

export default employeesRouter;
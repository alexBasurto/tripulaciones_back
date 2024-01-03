import { Router } from 'express';

import companiesController from '../controllers/companiesController.js';

const companiesRouter = Router();

companiesRouter.get ('/', (req, res) => {
    employeesController.getAll(req, res);
}
);

companiesRouter.get ('/:id', (req, res) => {
    employeesController.getById(req, res);
}
);

companiesRouter.post('/new', (req, res) => {
    employeesController.create(req, res);
}
);

companiesRouter.put('/:id', (req, res) => {
    employeesController.update(req, res);
}
);

companiesRouter.delete('/:id', (req, res) => {
    employeesController.remove(req, res);
}
);

export default companiesRouter;
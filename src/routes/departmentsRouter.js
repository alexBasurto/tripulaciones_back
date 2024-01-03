import { Router } from 'express';

import departmentsController from '../controllers/departmentsController.js';

const departmentsRouter = Router();

departmentsRouter.get ('/', (req, res) => {
    departmentsController.getAll(req, res);
}
);

departmentsRouter.get ('/:id', (req, res) => {
    departmentsController.getById(req, res);
}
);

departmentsRouter.post('/new', (req, res) => {
    departmentsController.create(req, res);
}
);

departmentsRouter.put('/:id', (req, res) => {
    departmentsController.update(req, res);
}
);

departmentsRouter.delete('/:id', (req, res) => {
    departmentsController.remove(req, res);
}
);

export default departmentsRouter;
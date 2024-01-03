import { Router } from 'express';

import employeesController from '../controllers/employeesController.js';

const employeesRouter = Router();

employeesRouter.get ('/', (req, res) => {
    employeesController.getAll(req, res);
}
);

export default employeesRouter;
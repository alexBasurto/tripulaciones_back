import { Router } from 'express';

import getAll from '../controllers/employeesController.js';

const employeesRouter = Router();

employeesRouter.get ('/', (req, res) => {
    getAll(req, res);
}
);

export default employeesRouter;
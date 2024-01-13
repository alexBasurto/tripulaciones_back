import { Router } from 'express';
import { isAuthenticated, isAdministrator } from '../middlewares/authMiddleware.js';

import dataController from '../controllers/dataController.js';

const dataRouter = Router();

dataRouter.post ('/', isAuthenticated, isAdministrator, (req, res) => {
    dataController.getData(req, res);
}
);

export default dataRouter;
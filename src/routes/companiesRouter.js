import { Router } from 'express';

import companiesController from '../controllers/companiesController.js';

const companiesRouter = Router();

companiesRouter.get ('/', (req, res) => {
    companiesController.getAll(req, res);
}
);

companiesRouter.get ('/:id', (req, res) => {
    companiesController.getById(req, res);
}
);

companiesRouter.post('/new', (req, res) => {
    companiesController.create(req, res);
}
);

companiesRouter.put('/:id', (req, res) => {
    companiesController.update(req, res);
}
);

companiesRouter.delete('/:id', (req, res) => {
    companiesController.remove(req, res);
}
);

export default companiesRouter;
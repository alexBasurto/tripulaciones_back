import { Router } from 'express';

import votingController from '../controllers/votingController.js';

const votingRouter = Router();

votingRouter.get ('/company/:id', (req, res) => {
    votingController.getAllByIdCompany(req, res);
}
);

votingRouter.get ('/latest/:id', (req, res) => {
    votingController.getLatestByIdEmployee(req, res);
}
);

votingRouter.post('/new', (req, res) => {
    votingController.create(req, res);
}
);

export default votingRouter;
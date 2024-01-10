import { Router } from 'express';

import votingController from '../controllers/votingController.js';

const votingRouter = Router();

votingRouter.get ('/company/:id', (req, res) => {
    votingController.getAllByIdCompany(req, res);
}
);

votingRouter.post('/user/new', (req, res) => {
    votingController.create(req, res);
}
);

votingRouter.post('/user/recent', (req, res) => {
    votingController.userRecentVotingData(req, res);
}
);

export default votingRouter;
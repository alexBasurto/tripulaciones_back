import { Router } from 'express';

import votingController from '../controllers/votingController.js';
import votingReasonsController from '../controllers/votingReasonsController.js';
import votingFeelingsController from '../controllers/votingFeelingsController.js';

const votingRouter = Router();

votingRouter.get ('/company/:id', (req, res) => {
    votingController.getAllByIdCompany(req, res);
}
);

votingRouter.post('/user/new', (req, res) => {
    votingController.create(req, res);
}
);

votingRouter.post('/user/reasons', (req, res) => {
    votingReasonsController.create(req, res);
}
);

votingRouter.post('/user/feelings', (req, res) => {
    votingFeelingsController.create(req, res);
}
);

votingRouter.post('/user/recent', (req, res) => {
    votingController.userRecentVotingData(req, res);
}
);

export default votingRouter;
import { Router } from 'express';

import { isAuthenticated } from '../middlewares/authMiddleware.js';
import votingController from '../controllers/votingController.js';
import votingReasonsController from '../controllers/votingReasonsController.js';
import votingFeelingsController from '../controllers/votingFeelingsController.js';

const votingRouter = Router();

votingRouter.get ('/company/:id', isAuthenticated, (req, res) => {
    votingController.getAllByIdCompany(req, res);
}
);

votingRouter.post('/user/new', isAuthenticated, (req, res) => {
    votingController.create(req, res);
}
);

votingRouter.post('/user/reasons', isAuthenticated, (req, res) => {
    votingReasonsController.create(req, res);
}
);

votingRouter.post('/user/feelings', isAuthenticated, (req, res) => {
    votingFeelingsController.create(req, res);
}
);

votingRouter.post('/user/recent', isAuthenticated, (req, res) => {
    votingController.userRecentVotingData(req, res);
}
);

export default votingRouter;
import { Router } from 'express';

import votingController from '../controllers/votingController.js';

const votingRouter = Router();

votingRouter.get ('/', (req, res) => {
    votingController.getAll(req, res);
}
);

votingRouter.get ('/latest', (req, res) => {
    votingController.getLastVote(req, res);
}
);

votingRouter.post('/new', (req, res) => {
    votingController.create(req, res);
}
);

export default votingRouter;
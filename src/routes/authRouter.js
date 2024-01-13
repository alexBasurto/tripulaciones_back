import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

import authController from '../controllers/authController.js';

const router = Router();

router.post('/login', authController.login);
router.get('/session', isAuthenticated, authController.session);
router.post('/logout', isAuthenticated, authController.logout);

export default router;
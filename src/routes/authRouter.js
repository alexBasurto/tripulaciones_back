import { Router } from 'express';
import { isAuthenticated, isAdministrator } from '../middlewares/authMiddleware.js';

import authController from '../controllers/authController.js';

const router = Router();

router.post('/login', authController.login);
router.get('/session', isAuthenticated, authController.session);
router.post('/logout', isAuthenticated, authController.logout);


router.post('/loginAdmin', authController.loginAdmin);
router.get('/sessionAdmin', isAdministrator, authController.sessionAdmin);
router.post('/logoutAdmin', isAdministrator, authController.logoutAdmin);

export default router;
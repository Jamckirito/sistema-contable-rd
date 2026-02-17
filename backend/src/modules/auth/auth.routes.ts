import { Router, type IRouter } from 'express';
import * as authController from './auth.controller';
import { authenticate } from '../../shared/middleware/auth.middleware';

const router: IRouter = Router();

// Rutas públicas
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh-token', authController.refreshToken);

// Rutas protegidas
router.post('/logout', authenticate, authController.logout);
router.post('/change-password', authenticate, authController.changePassword);
router.get('/profile', authenticate, authController.getProfile);

export default router;

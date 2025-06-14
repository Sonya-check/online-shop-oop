// backend/src/interfaces-adapters/routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

// Регистрация
router.post('/register', (req, res, next) => authController.register(req, res, next));

// Логин
router.post('/login', (req, res, next) => authController.login(req, res, next));

export default router;
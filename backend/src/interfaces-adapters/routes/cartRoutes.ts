// backend/src/interfaces-adapters/routes/cartRoutes.ts
import { Router } from 'express';
import { CartController } from '../controllers/CartController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();
const cartController = new CartController();

// Получить корзину текущего пользователя
router.get('/', authMiddleware(), (req, res, next) => cartController.getCart(req, res, next));

// Добавить товар в корзину
router.post('/', authMiddleware(), (req, res, next) => cartController.addToCart(req, res, next));

// Удалить товар из корзины (по productId)
router.delete('/:productId', authMiddleware(), (req, res, next) =>
  cartController.removeFromCart(req, res, next)
);

export default router;
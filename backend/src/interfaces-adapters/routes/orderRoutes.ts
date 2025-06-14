// backend/src/interfaces-adapters/routes/orderRoutes.ts
import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();
const orderController = new OrderController();

// Получить заказы текущего пользователя
router.get('/', authMiddleware(), (req, res, next) => orderController.getOrders(req, res, next));

// Создать новый заказ
router.post('/', authMiddleware(), (req, res, next) => orderController.createOrder(req, res, next));

export default router;
// backend/src/interfaces-adapters/routes/productRoutes.ts
import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();
const productController = new ProductController();

// Получить все товары (публично)
router.get('/', (req, res, next) => productController.getAll(req, res, next));

// Создать товар (только ADMIN)
router.post('/', authMiddleware('ADMIN'), (req, res, next) =>
  productController.create(req, res, next)
);

export default router;
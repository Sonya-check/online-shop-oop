// backend/src/interfaces-adapters/controllers/CartController.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaCartRepository } from '../../infrastructure/db/repositories/PrismaCartRepository';
import { GetCartUseCase } from '../../use-cases/cart/GetCartUseCase';
import { AddToCartUseCase } from '../../use-cases/cart/AddToCartUseCase';
import { RemoveFromCartUseCase } from '../../use-cases/cart/RemoveFromCartUseCase';
import { notifyUserCartUpdate } from '../../realtime';

const cartRepo = new PrismaCartRepository();
const getCartUC = new GetCartUseCase(cartRepo);
const addToCartUC = new AddToCartUseCase(cartRepo);
const removeFromCartUC = new RemoveFromCartUseCase(cartRepo);

export class CartController {
  // GET /api/cart  (нужна авторизация)
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore: поле user добавляется в authMiddleware
      const userId: number = req.user.id;
      const items = await getCartUC.execute(userId);
      res.json(items);
    } catch (err) {
      next(err);
    }
  }

  // POST /api/cart  (нужна авторизация)
  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId: number = req.user.id;
      const { productId, quantity } = req.body;
      const item = await addToCartUC.execute(userId, productId, quantity);
      // Уведомляем клиента через WebSocket
      notifyUserCartUpdate(userId, { action: 'add', item });
      res.status(201).json(item);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/cart/:productId  (нужна авторизация)
  async removeFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId: number = req.user.id;
      const productId = parseInt(req.params.productId, 10);
      await removeFromCartUC.execute(userId, productId);
      notifyUserCartUpdate(userId, { action: 'remove', productId });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
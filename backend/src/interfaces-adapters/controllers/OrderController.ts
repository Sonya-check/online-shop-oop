// backend/src/interfaces-adapters/controllers/OrderController.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaOrderRepository } from '../../infrastructure/db/repositories/PrismaOrderRepository';
import { PrismaCartRepository } from '../../infrastructure/db/repositories/PrismaCartRepository';
import { CreateOrderUseCase } from '../../use-cases/order/CreateOrderUseCase';
import { GetOrdersUseCase } from '../../use-cases/order/GetOrdersUseCase';

const orderRepo = new PrismaOrderRepository();
const cartRepo = new PrismaCartRepository();
const createOrderUC = new CreateOrderUseCase(orderRepo, cartRepo);
const getOrdersUC = new GetOrdersUseCase(orderRepo);

export class OrderController {
  // GET /api/orders  (нужна авторизация)
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId: number = req.user.id;
      const orders = await getOrdersUC.execute(userId);
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }

  // POST /api/orders  (нужна авторизация)
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId: number = req.user.id;
      const order = await createOrderUC.execute(userId);
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }
}
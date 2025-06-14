"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const PrismaOrderRepository_1 = require("../../infrastructure/db/repositories/PrismaOrderRepository");
const PrismaCartRepository_1 = require("../../infrastructure/db/repositories/PrismaCartRepository");
const CreateOrderUseCase_1 = require("../../use-cases/order/CreateOrderUseCase");
const GetOrdersUseCase_1 = require("../../use-cases/order/GetOrdersUseCase");
const orderRepo = new PrismaOrderRepository_1.PrismaOrderRepository();
const cartRepo = new PrismaCartRepository_1.PrismaCartRepository();
const createOrderUC = new CreateOrderUseCase_1.CreateOrderUseCase(orderRepo, cartRepo);
const getOrdersUC = new GetOrdersUseCase_1.GetOrdersUseCase(orderRepo);
class OrderController {
    // GET /api/orders  (нужна авторизация)
    async getOrders(req, res, next) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const orders = await getOrdersUC.execute(userId);
            res.json(orders);
        }
        catch (err) {
            next(err);
        }
    }
    // POST /api/orders  (нужна авторизация)
    async createOrder(req, res, next) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const order = await createOrderUC.execute(userId);
            res.status(201).json(order);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map
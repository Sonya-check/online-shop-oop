"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaOrderRepository = void 0;
// src/infrastructure/db/repositories/PrismaOrderRepository.ts
const prisma_1 = __importDefault(require("../prisma"));
const Order_1 = require("../../../entities/Order");
const OrderItem_1 = require("../../../entities/OrderItem");
const Product_1 = require("../../../entities/Product");
class PrismaOrderRepository {
    async createOrder(data) {
        const createdOrder = await prisma_1.default.order.create({
            data: {
                userId: data.userId,
                total: data.total,
                orderItems: {
                    create: data.items.map(i => ({
                        productId: i.productId,
                        quantity: i.quantity,
                        price: i.price,
                    })),
                },
            },
            include: {
                orderItems: { include: { product: true } },
            },
        });
        const orderItems = createdOrder.orderItems.map((oi) => new OrderItem_1.OrderItem(oi.id, new Product_1.Product(oi.product.id, oi.product.name, oi.product.description, oi.product.price), oi.quantity, oi.price));
        return new Order_1.Order(createdOrder.id, createdOrder.userId, createdOrder.total, createdOrder.createdAt, createdOrder.updatedAt, orderItems);
    }
    async getOrdersByUser(userId) {
        const orders = await prisma_1.default.order.findMany({
            where: { userId },
            include: { orderItems: { include: { product: true } } },
        });
        return orders.map((o) => {
            const items = o.orderItems.map((oi) => new OrderItem_1.OrderItem(oi.id, new Product_1.Product(oi.product.id, oi.product.name, oi.product.description, oi.product.price), oi.quantity, oi.price));
            return new Order_1.Order(o.id, o.userId, o.total, o.createdAt, o.updatedAt, items);
        });
    }
}
exports.PrismaOrderRepository = PrismaOrderRepository;
//# sourceMappingURL=PrismaOrderRepository.js.map
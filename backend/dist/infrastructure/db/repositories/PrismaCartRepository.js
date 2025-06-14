"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCartRepository = void 0;
// src/infrastructure/db/repositories/PrismaCartRepository.ts
const prisma_1 = __importDefault(require("../prisma"));
const CartItem_1 = require("../../../entities/CartItem");
const Product_1 = require("../../../entities/Product");
class PrismaCartRepository {
    async getCartItemsByUser(userId) {
        const items = await prisma_1.default.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });
        return items.map((i) => new CartItem_1.CartItem(i.id, i.userId, new Product_1.Product(i.product.id, i.product.name, i.product.description, i.product.price), i.quantity));
    }
    async addToCart(userId, productId, quantity) {
        // Проверяем, есть ли уже этот товар в корзине
        const existing = await prisma_1.default.cartItem.findUnique({
            where: { userId_productId: { userId, productId } },
        });
        if (existing) {
            const updated = await prisma_1.default.cartItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + quantity },
                include: { product: true },
            });
            return new CartItem_1.CartItem(updated.id, updated.userId, new Product_1.Product(updated.product.id, updated.product.name, updated.product.description, updated.product.price), updated.quantity);
        }
        else {
            const created = await prisma_1.default.cartItem.create({
                data: { userId, productId, quantity },
                include: { product: true },
            });
            return new CartItem_1.CartItem(created.id, created.userId, new Product_1.Product(created.product.id, created.product.name, created.product.description, created.product.price), created.quantity);
        }
    }
    async removeFromCart(userId, productId) {
        await prisma_1.default.cartItem.delete({
            where: { userId_productId: { userId, productId } },
        });
    }
    async clearCart(userId) {
        await prisma_1.default.cartItem.deleteMany({ where: { userId } });
    }
}
exports.PrismaCartRepository = PrismaCartRepository;
//# sourceMappingURL=PrismaCartRepository.js.map
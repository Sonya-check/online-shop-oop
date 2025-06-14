"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderUseCase = void 0;
class CreateOrderUseCase {
    constructor(orderRepo, cartRepo) {
        this.orderRepo = orderRepo;
        this.cartRepo = cartRepo;
    }
    async execute(userId) {
        const cartItems = await this.cartRepo.getCartItemsByUser(userId);
        if (cartItems.length === 0) {
            const error = new Error('Корзина пуста');
            error.statusCode = 400;
            throw error;
        }
        const total = cartItems.reduce((sum, ci) => sum + ci.quantity * ci.product.price, 0);
        const order = await this.orderRepo.createOrder({
            userId,
            total,
            items: cartItems.map(ci => ({
                productId: ci.product.id,
                quantity: ci.quantity,
                price: ci.product.price,
            })),
        });
        await this.cartRepo.clearCart(userId);
        return order;
    }
}
exports.CreateOrderUseCase = CreateOrderUseCase;
//# sourceMappingURL=CreateOrderUseCase.js.map
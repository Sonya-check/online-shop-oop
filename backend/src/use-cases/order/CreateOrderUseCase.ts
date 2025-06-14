// src/use-cases/order/CreateOrderUseCase.ts
import { IOrderRepository } from '../../interfaces/IOrderRepository';
import { ICartRepository } from '../../interfaces/ICartRepository';
import { Order } from '../../entities/Order';

export class CreateOrderUseCase {
  constructor(private orderRepo: IOrderRepository, private cartRepo: ICartRepository) {}

  async execute(userId: number): Promise<Order> {
    const cartItems = await this.cartRepo.getCartItemsByUser(userId);
    if (cartItems.length === 0) {
      const error: any = new Error('Корзина пуста');
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
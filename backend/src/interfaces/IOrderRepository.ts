// src/interfaces/IOrderRepository.ts
import { Order } from '../entities/Order';

export interface IOrderRepository {
  /**
   * Создать новый заказ.
   * @param data { userId, total, items: [{ productId, quantity, price }] }
   * @returns созданный Order
   */
  createOrder(data: {
    userId: number;
    total: number;
    items: { productId: number; quantity: number; price: number }[];
  }): Promise<Order>;

  /**
   * Получить все заказы пользователя.
   * @param userId идентификатор пользователя
   * @returns массив Order
   */
  getOrdersByUser(userId: number): Promise<Order[]>;
}
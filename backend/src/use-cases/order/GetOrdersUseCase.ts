// src/use-cases/order/GetOrdersUseCase.ts
import { IOrderRepository } from '../../interfaces/IOrderRepository';
import { Order } from '../../entities/Order';

export class GetOrdersUseCase {
  constructor(private orderRepo: IOrderRepository) {}

  async execute(userId: number): Promise<Order[]> {
    return this.orderRepo.getOrdersByUser(userId);
  }
}
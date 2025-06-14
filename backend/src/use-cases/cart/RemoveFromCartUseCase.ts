// src/use-cases/cart/RemoveFromCartUseCase.ts
import { ICartRepository } from '../../interfaces/ICartRepository';

export class RemoveFromCartUseCase {
  constructor(private cartRepo: ICartRepository) {}

  async execute(userId: number, productId: number): Promise<void> {
    return this.cartRepo.removeFromCart(userId, productId);
  }
}
// src/use-cases/cart/GetCartUseCase.ts
import { ICartRepository } from '../../interfaces/ICartRepository';
import { CartItem } from '../../entities/CartItem';

export class GetCartUseCase {
  constructor(private cartRepo: ICartRepository) {}

  async execute(userId: number): Promise<CartItem[]> {
    return this.cartRepo.getCartItemsByUser(userId);
  }
}
// src/use-cases/cart/AddToCartUseCase.ts
import { ICartRepository } from '../../interfaces/ICartRepository';
import { CartItem } from '../../entities/CartItem';

export class AddToCartUseCase {
  constructor(private cartRepo: ICartRepository) {}

  async execute(userId: number, productId: number, quantity: number): Promise<CartItem> {
    return this.cartRepo.addToCart(userId, productId, quantity);
  }
}
// src/entities/CartItem.ts
import { Product } from './Product';

export class CartItem {
  constructor(
    public id: number,
    public userId: number,
    public product: Product,
    public quantity: number
  ) {}
}
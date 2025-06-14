// src/entities/OrderItem.ts
import { Product } from './Product';

export class OrderItem {
  constructor(
    public id: number,
    public product: Product,
    public quantity: number,
    public price: number
  ) {}
}
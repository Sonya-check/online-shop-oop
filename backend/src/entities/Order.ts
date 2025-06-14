// src/entities/Order.ts
import { OrderItem } from './OrderItem';

export class Order {
  constructor(
    public id: number,
    public userId: number,
    public total: number,
    public createdAt: Date,
    public updatedAt: Date,
    public orderItems: OrderItem[]
  ) {}
}
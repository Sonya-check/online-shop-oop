// src/infrastructure/db/repositories/PrismaOrderRepository.ts
import prisma from '../prisma';
import { IOrderRepository } from '../../../interfaces/IOrderRepository';
import { Order } from '../../../entities/Order';
import { OrderItem } from '../../../entities/OrderItem';
import { Product } from '../../../entities/Product';
import { Order as DbOrder, OrderItem as DbOrderItem, Product as DbProduct } from '../../../generated/prisma';

export class PrismaOrderRepository implements IOrderRepository {
  async createOrder(data: {
    userId: number;
    total: number;
    items: { productId: number; quantity: number; price: number }[];
  }): Promise<Order> {
    const createdOrder = await prisma.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        orderItems: {
          create: data.items.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
          })),
        },
      },
      include: {
        orderItems: { include: { product: true } },
      },
    });

    const orderItems = createdOrder.orderItems.map(
      (oi: DbOrderItem & { product: DbProduct }) =>
        new OrderItem(
          oi.id,
          new Product(oi.product.id, oi.product.name, oi.product.description, oi.product.price),
          oi.quantity,
          oi.price
        )
    );

    return new Order(
      createdOrder.id,
      createdOrder.userId,
      createdOrder.total,
      createdOrder.createdAt,
      createdOrder.updatedAt,
      orderItems
    );
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { product: true } } },
    });

    return orders.map(
      (o: DbOrder & { orderItems: (DbOrderItem & { product: DbProduct })[] }) => {
        const items = o.orderItems.map(
          (oi: DbOrderItem & { product: DbProduct }) =>
            new OrderItem(
              oi.id,
              new Product(oi.product.id, oi.product.name, oi.product.description, oi.product.price),
              oi.quantity,
              oi.price
            )
        );
        return new Order(o.id, o.userId, o.total, o.createdAt, o.updatedAt, items);
      }
    );
  }
}
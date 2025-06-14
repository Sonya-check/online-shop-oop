// src/infrastructure/db/repositories/PrismaCartRepository.ts
import prisma from '../prisma';
import { ICartRepository } from '../../../interfaces/ICartRepository';
import { CartItem } from '../../../entities/CartItem';
import { Product } from '../../../entities/Product';

export class PrismaCartRepository implements ICartRepository {
  async getCartItemsByUser(userId: number): Promise<CartItem[]> {
    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    return items.map((i: any )=>
      new CartItem(
        i.id,
        i.userId,
        new Product(i.product.id, i.product.name, i.product.description, i.product.price),
        i.quantity
      )
    );
  }

  async addToCart(userId: number, productId: number, quantity: number): Promise<CartItem> {
    // Проверяем, есть ли уже этот товар в корзине
    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
        include: { product: true },
      });
      return new CartItem(
        updated.id,
        updated.userId,
        new Product(updated.product.id, updated.product.name, updated.product.description, updated.product.price),
        updated.quantity
      );
    } else {
      const created = await prisma.cartItem.create({
        data: { userId, productId, quantity },
        include: { product: true },
      });
      return new CartItem(
        created.id,
        created.userId,
        new Product(created.product.id, created.product.name, created.product.description, created.product.price),
        created.quantity
      );
    }
  }

  async removeFromCart(userId: number, productId: number): Promise<void> {
    await prisma.cartItem.delete({
      where: { userId_productId: { userId, productId } },
    });
  }

  async clearCart(userId: number): Promise<void> {
    await prisma.cartItem.deleteMany({ where: { userId } });
  }
}
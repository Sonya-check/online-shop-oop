// src/infrastructure/db/repositories/PrismaProductRepository.ts
import prisma from '../prisma';
import { IProductRepository } from '../../../interfaces/IProductRepository';
import { Product } from '../../../entities/Product';

export class PrismaProductRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    const items = await prisma.product.findMany();
    return items.map((i: any) => new Product(i.id, i.name, i.description, i.price));
  }

  async create(data: { name: string; description?: string; price: number }): Promise<Product> {
    const i = await prisma.product.create({ data });
    return new Product(i.id, i.name, i.description, i.price);
  }
}
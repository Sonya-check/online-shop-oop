// src/use-cases/product/CreateProductUseCase.ts
import { IProductRepository } from '../../interfaces/IProductRepository';
import { Product } from '../../entities/Product';

interface CreateDTO {
  name: string;
  description?: string;
  price: number;
}

export class CreateProductUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(data: CreateDTO): Promise<Product> {
    return this.productRepo.create(data);
  }
}
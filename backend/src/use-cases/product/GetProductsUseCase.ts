// src/use-cases/product/GetProductsUseCase.ts
import { IProductRepository } from '../../interfaces/IProductRepository';
import { Product } from '../../entities/Product';

export class GetProductsUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepo.getAll();
  }
}
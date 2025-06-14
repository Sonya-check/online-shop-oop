// src/interfaces/IProductRepository.ts
import { Product } from '../entities/Product';

export interface IProductRepository {
  /**
   * Получить все продукты.
   * @returns массив объектов Product
   */
  getAll(): Promise<Product[]>;

  /**
   * Создать новый продукт.
   * @param data { name, description?, price }
   * @returns созданный Product
   */
  create(data: { name: string; description?: string; price: number }): Promise<Product>;
}
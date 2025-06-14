// frontend/src/features/products/productsAPI.ts
import api from '../../api/api';
import { Product } from '../../types';

// Функция получения списка товаров — указываем Promise<Product[]>
export const fetchProducts = async (): Promise<Product[]> => {
  // Явно говорим, что response.data будет Product[]
  const response = await api.get<Product[]>('/products');
  return response.data;
};

// DTO для создания товара
export interface CreateProductDTO {
  name: string;
  description?: string;
  price: number;
}

// Функция создания нового товара — возвращает Promise<Product>
export const createProduct = async (
  data: CreateProductDTO,
  token: string
): Promise<Product> => {
  // Для POST указываем, что response.data — Product
  const response = await api.post<Product>('/products', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
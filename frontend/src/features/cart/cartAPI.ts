// frontend/src/features/cart/cartAPI.ts
import api from '../../api/api';
import { CartItem } from '../../types';

// 1) Получить все элементы корзины текущего пользователя
export const getCartItems = async (token: string): Promise<CartItem[]> => {
  // Указываем, что response.data будет CartItem[]
  const response = await api.get<CartItem[]>('/cart', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 2) Добавить товар в корзину (или увеличить количество)
export interface AddToCartDTO {
  productId: number;
  quantity: number;
}

export const addToCart = async (
  token: string,
  data: AddToCartDTO
): Promise<CartItem> => {
  // Указываем, что response.data будет CartItem
  const response = await api.post<CartItem>('/cart', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 3) Удалить конкретный товар из корзины
export const removeFromCart = async (
  token: string,
  productId: number
): Promise<void> => {
  await api.delete(`/cart/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
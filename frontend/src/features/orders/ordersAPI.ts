// frontend/src/features/orders/ordersAPI.ts
import api from '../../api/api';
import { Order } from '../../types';

// 1) Создать заказ (Checkout)
export const createOrder = async (token: string): Promise<Order> => {
  const response = await api.post<Order>('/orders', {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 2) Получить все заказы пользователя
export const getOrders = async (token: string): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
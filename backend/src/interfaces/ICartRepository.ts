// src/interfaces/ICartRepository.ts
import { CartItem } from '../entities/CartItem';

export interface ICartRepository {
  /**
   * Получить все элементы корзины для пользователя.
   * @param userId идентификатор пользователя
   * @returns массив CartItem
   */
  getCartItemsByUser(userId: number): Promise<CartItem[]>;

  /**
   * Добавить товар в корзину (или увеличить кол-во, если уже есть).
   * @param userId идентификатор пользователя
   * @param productId идентификатор продукта
   * @param quantity количество (целое)
   * @returns новый или обновлённый CartItem
   */
  addToCart(userId: number, productId: number, quantity: number): Promise<CartItem>;

  /**
   * Удалить товар из корзины (по userId+productId).
   * @param userId идентификатор пользователя
   * @param productId идентификатор продукта
   */
  removeFromCart(userId: number, productId: number): Promise<void>;

  /**
   * Очистить всю корзину пользователя.
   * @param userId идентификатор пользователя
   */
  clearCart(userId: number): Promise<void>;
}
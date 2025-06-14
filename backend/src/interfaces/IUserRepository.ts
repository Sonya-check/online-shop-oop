// src/interfaces/IUserRepository.ts
import { User } from '../entities/User';

export interface IUserRepository {
  /**
   * Создать нового пользователя с заданными данными.
   * @param data Объект с полями { email, password (хеш), role }
   * @returns созданный User
   */
  create(data: { email: string; password: string; role: 'ADMIN' | 'CUSTOMER' }): Promise<User>;

  /**
   * Найти пользователя по email.
   * @param email почта
   * @returns найденный User или null
   */
  getByEmail(email: string): Promise<User | null>;

  /**
   * Найти пользователя по ID.
   * @param id идентификатор пользователя
   * @returns найденный User или null
   */
  getById(id: number): Promise<User | null>;
}

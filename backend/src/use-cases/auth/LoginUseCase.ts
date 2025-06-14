// src/use-cases/auth/LoginUseCase.ts
import { IUserRepository } from '../../interfaces/IUserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env';

interface LoginDTO {
  email: string;
  password: string;
}

export class LoginUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute({ email, password }: LoginDTO) {
    const user = await this.userRepo.getByEmail(email);
    if (!user) {
      const error: any = new Error('Неверные учётные данные');
      error.statusCode = 400;
      throw error;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const error: any = new Error('Неверные учётные данные');
      error.statusCode = 400;
      throw error;
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }
}
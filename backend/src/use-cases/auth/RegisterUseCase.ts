// src/use-cases/auth/RegisterUseCase.ts
import { IUserRepository } from '../../interfaces/IUserRepository';
import bcrypt from 'bcrypt';

interface RegisterDTO {
  email: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export class RegisterUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute({ email, password, role }: RegisterDTO) {
    const existing = await this.userRepo.getByEmail(email);
    if (existing) {
      const error: any = new Error('Email уже зарегистрирован');
      error.statusCode = 400;
      throw error;
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userRepo.create({ email, password: hashed, role });
    return user;
  }
}
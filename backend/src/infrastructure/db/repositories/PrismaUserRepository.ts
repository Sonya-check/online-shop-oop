// src/infrastructure/db/repositories/PrismaUserRepository.ts
import prisma from '../prisma';
import { IUserRepository } from '../../../interfaces/IUserRepository';
import { User } from '../../../entities/User';

export class PrismaUserRepository implements IUserRepository {
  async create(data: { email: string; password: string; role: 'ADMIN' | 'CUSTOMER' }): Promise<User> {
    const u = await prisma.user.create({ data });
    return new User(u.id, u.email, u.password, u.role);
  }

  async getByEmail(email: string): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { email } });
    return u ? new User(u.id, u.email, u.password, u.role) : null;
  }

  async getById(id: number): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { id } });
    return u ? new User(u.id, u.email, u.password, u.role) : null;
  }
}
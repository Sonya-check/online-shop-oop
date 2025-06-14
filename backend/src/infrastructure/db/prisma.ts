// src/infrastructure/db/prisma.ts
import { PrismaClient } from '../../generated/prisma';

// Создаём и экспортируем единственный экземпляр PrismaClient
const prisma = new PrismaClient();
export default prisma;
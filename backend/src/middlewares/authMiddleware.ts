// backend/src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaUserRepository } from '../infrastructure/db/repositories/PrismaUserRepository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { JWT_SECRET } from '../config/env';

interface TokenPayload {
  userId: number;
  role: 'ADMIN' | 'CUSTOMER';
  iat: number;
  exp: number;
}

// Теперь allowedRoles: any[], чтобы можно было вызывать authMiddleware('ADMIN')
export const authMiddleware = (...allowedRoles: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const token = authHeader.split(' ')[1];
      const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;

      const userRepo: IUserRepository = new PrismaUserRepository();
      const user = await userRepo.getById(payload.userId);
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      if (allowedRoles.length > 0 && !allowedRoles.includes(payload.role)) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      // @ts-ignore: добаляем поле user
      req.user = { id: payload.userId, role: payload.role };
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  };
};
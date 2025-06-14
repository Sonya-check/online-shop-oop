// backend/src/interfaces-adapters/controllers/AuthController.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaUserRepository } from '../../infrastructure/db/repositories/PrismaUserRepository';
import { RegisterUseCase } from '../../use-cases/auth/RegisterUseCase';
import { LoginUseCase } from '../../use-cases/auth/LoginUseCase';

const userRepo = new PrismaUserRepository();
const registerUC = new RegisterUseCase(userRepo);
const loginUC = new LoginUseCase(userRepo);

export class AuthController {
  // POST /api/auth/register
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;
      const user = await registerUC.execute({ email, password, role });
      res.status(201).json({ id: user.id, email: user.email, role: user.role });
    } catch (err) {
      next(err);
    }
  }

  // POST /api/auth/login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { token, user } = await loginUC.execute({ email, password });
      res.json({ token, user });
    } catch (err) {
      next(err);
    }
  }
}
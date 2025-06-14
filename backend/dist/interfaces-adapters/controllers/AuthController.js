"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const PrismaUserRepository_1 = require("../../infrastructure/db/repositories/PrismaUserRepository");
const RegisterUseCase_1 = require("../../use-cases/auth/RegisterUseCase");
const LoginUseCase_1 = require("../../use-cases/auth/LoginUseCase");
const userRepo = new PrismaUserRepository_1.PrismaUserRepository();
const registerUC = new RegisterUseCase_1.RegisterUseCase(userRepo);
const loginUC = new LoginUseCase_1.LoginUseCase(userRepo);
class AuthController {
    // POST /api/auth/register
    async register(req, res, next) {
        try {
            const { email, password, role } = req.body;
            const user = await registerUC.execute({ email, password, role });
            res.status(201).json({ id: user.id, email: user.email, role: user.role });
        }
        catch (err) {
            next(err);
        }
    }
    // POST /api/auth/login
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { token, user } = await loginUC.execute({ email, password });
            res.json({ token, user });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map
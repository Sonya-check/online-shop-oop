"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
class LoginUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute({ email, password }) {
        const user = await this.userRepo.getByEmail(email);
        if (!user) {
            const error = new Error('Неверные учётные данные');
            error.statusCode = 400;
            throw error;
        }
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match) {
            const error = new Error('Неверные учётные данные');
            error.statusCode = 400;
            throw error;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, env_1.JWT_SECRET, { expiresIn: '7d' });
        return { token, user: { id: user.id, email: user.email, role: user.role } };
    }
}
exports.LoginUseCase = LoginUseCase;
//# sourceMappingURL=LoginUseCase.js.map
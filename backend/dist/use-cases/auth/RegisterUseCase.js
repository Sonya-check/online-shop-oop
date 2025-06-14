"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class RegisterUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute({ email, password, role }) {
        const existing = await this.userRepo.getByEmail(email);
        if (existing) {
            const error = new Error('Email уже зарегистрирован');
            error.statusCode = 400;
            throw error;
        }
        const hashed = await bcrypt_1.default.hash(password, 10);
        const user = await this.userRepo.create({ email, password: hashed, role });
        return user;
    }
}
exports.RegisterUseCase = RegisterUseCase;
//# sourceMappingURL=RegisterUseCase.js.map
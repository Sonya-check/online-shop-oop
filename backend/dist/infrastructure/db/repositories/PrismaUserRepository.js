"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
// src/infrastructure/db/repositories/PrismaUserRepository.ts
const prisma_1 = __importDefault(require("../prisma"));
const User_1 = require("../../../entities/User");
class PrismaUserRepository {
    async create(data) {
        const u = await prisma_1.default.user.create({ data });
        return new User_1.User(u.id, u.email, u.password, u.role);
    }
    async getByEmail(email) {
        const u = await prisma_1.default.user.findUnique({ where: { email } });
        return u ? new User_1.User(u.id, u.email, u.password, u.role) : null;
    }
    async getById(id) {
        const u = await prisma_1.default.user.findUnique({ where: { id } });
        return u ? new User_1.User(u.id, u.email, u.password, u.role) : null;
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
//# sourceMappingURL=PrismaUserRepository.js.map
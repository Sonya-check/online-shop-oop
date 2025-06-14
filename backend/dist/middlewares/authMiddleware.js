"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PrismaUserRepository_1 = require("../infrastructure/db/repositories/PrismaUserRepository");
const env_1 = require("../config/env");
// Теперь allowedRoles: any[], чтобы можно было вызывать authMiddleware('ADMIN')
const authMiddleware = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            const token = authHeader.split(' ')[1];
            const payload = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
            const userRepo = new PrismaUserRepository_1.PrismaUserRepository();
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
        }
        catch (err) {
            console.error(err);
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
    };
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map
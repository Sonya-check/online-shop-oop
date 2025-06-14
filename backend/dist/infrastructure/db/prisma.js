"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/db/prisma.ts
const prisma_1 = require("../../generated/prisma");
// Создаём и экспортируем единственный экземпляр PrismaClient
const prisma = new prisma_1.PrismaClient();
exports.default = prisma;
//# sourceMappingURL=prisma.js.map
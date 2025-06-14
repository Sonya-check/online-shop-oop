"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProductRepository = void 0;
// src/infrastructure/db/repositories/PrismaProductRepository.ts
const prisma_1 = __importDefault(require("../prisma"));
const Product_1 = require("../../../entities/Product");
class PrismaProductRepository {
    async getAll() {
        const items = await prisma_1.default.product.findMany();
        return items.map((i) => new Product_1.Product(i.id, i.name, i.description, i.price));
    }
    async create(data) {
        const i = await prisma_1.default.product.create({ data });
        return new Product_1.Product(i.id, i.name, i.description, i.price);
    }
}
exports.PrismaProductRepository = PrismaProductRepository;
//# sourceMappingURL=PrismaProductRepository.js.map
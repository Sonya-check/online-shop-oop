"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const PrismaProductRepository_1 = require("../../infrastructure/db/repositories/PrismaProductRepository");
const GetProductsUseCase_1 = require("../../use-cases/product/GetProductsUseCase");
const CreateProductUseCase_1 = require("../../use-cases/product/CreateProductUseCase");
const productRepo = new PrismaProductRepository_1.PrismaProductRepository();
const getProductsUC = new GetProductsUseCase_1.GetProductsUseCase(productRepo);
const createProductUC = new CreateProductUseCase_1.CreateProductUseCase(productRepo);
class ProductController {
    // GET /api/products
    async getAll(req, res, next) {
        try {
            const products = await getProductsUC.execute();
            res.json(products);
        }
        catch (err) {
            next(err);
        }
    }
    // POST /api/products   (только ADMIN)
    async create(req, res, next) {
        try {
            const { name, description, price } = req.body;
            const product = await createProductUC.execute({ name, description, price });
            res.status(201).json(product);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map
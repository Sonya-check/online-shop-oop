// backend/src/interfaces-adapters/controllers/ProductController.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaProductRepository } from '../../infrastructure/db/repositories/PrismaProductRepository';
import { GetProductsUseCase } from '../../use-cases/product/GetProductsUseCase';
import { CreateProductUseCase } from '../../use-cases/product/CreateProductUseCase';

const productRepo = new PrismaProductRepository();
const getProductsUC = new GetProductsUseCase(productRepo);
const createProductUC = new CreateProductUseCase(productRepo);

export class ProductController {
  // GET /api/products
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await getProductsUC.execute();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  // POST /api/products   (только ADMIN)
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price } = req.body;
      const product = await createProductUC.execute({ name, description, price });
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }
}
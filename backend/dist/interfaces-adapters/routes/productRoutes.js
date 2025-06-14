"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/interfaces-adapters/routes/productRoutes.ts
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const productController = new ProductController_1.ProductController();
// Получить все товары (публично)
router.get('/', (req, res, next) => productController.getAll(req, res, next));
// Создать товар (только ADMIN)
router.post('/', (0, authMiddleware_1.authMiddleware)('ADMIN'), (req, res, next) => productController.create(req, res, next));
exports.default = router;
//# sourceMappingURL=productRoutes.js.map
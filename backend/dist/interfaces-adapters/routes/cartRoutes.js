"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/interfaces-adapters/routes/cartRoutes.ts
const express_1 = require("express");
const CartController_1 = require("../controllers/CartController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const cartController = new CartController_1.CartController();
// Получить корзину текущего пользователя
router.get('/', (0, authMiddleware_1.authMiddleware)(), (req, res, next) => cartController.getCart(req, res, next));
// Добавить товар в корзину
router.post('/', (0, authMiddleware_1.authMiddleware)(), (req, res, next) => cartController.addToCart(req, res, next));
// Удалить товар из корзины (по productId)
router.delete('/:productId', (0, authMiddleware_1.authMiddleware)(), (req, res, next) => cartController.removeFromCart(req, res, next));
exports.default = router;
//# sourceMappingURL=cartRoutes.js.map
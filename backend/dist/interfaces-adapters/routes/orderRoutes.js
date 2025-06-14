"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/interfaces-adapters/routes/orderRoutes.ts
const express_1 = require("express");
const OrderController_1 = require("../controllers/OrderController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const orderController = new OrderController_1.OrderController();
// Получить заказы текущего пользователя
router.get('/', (0, authMiddleware_1.authMiddleware)(), (req, res, next) => orderController.getOrders(req, res, next));
// Создать новый заказ
router.post('/', (0, authMiddleware_1.authMiddleware)(), (req, res, next) => orderController.createOrder(req, res, next));
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/interfaces-adapters/routes/authRoutes.ts
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
const authController = new AuthController_1.AuthController();
// Регистрация
router.post('/register', (req, res, next) => authController.register(req, res, next));
// Логин
router.post('/login', (req, res, next) => authController.login(req, res, next));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
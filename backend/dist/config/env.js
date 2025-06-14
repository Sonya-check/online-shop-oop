"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.JWT_SECRET = exports.PORT = void 0;
// src/config/env.ts
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Указываем путь к вашему файлу .env (на уровень выше от src/config)
const envPath = path_1.default.resolve(__dirname, '../../.env');
dotenv_1.default.config({ path: envPath });
// Экспортируем переменные для использования в приложении
exports.PORT = process.env.PORT || 4000;
exports.JWT_SECRET = process.env.JWT_SECRET || 'change_me';
exports.DATABASE_URL = process.env.DATABASE_URL || '';
//# sourceMappingURL=env.js.map
// src/config/env.ts
import dotenv from 'dotenv';
import path from 'path';

// Указываем путь к вашему файлу .env (на уровень выше от src/config)
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

// Экспортируем переменные для использования в приложении
export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET || 'change_me';
export const DATABASE_URL = process.env.DATABASE_URL || '';
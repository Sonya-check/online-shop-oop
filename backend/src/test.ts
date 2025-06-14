// src/test.ts
import { PrismaUserRepository } from './infrastructure/db/repositories/PrismaUserRepository';

async function testUserRepo() {
  const userRepo = new PrismaUserRepository();

  console.log('--- Создаём пользователя ---');
  const newUser = await userRepo.create({
    email: 'test@example.com',
    password: 'hashed_password_123', // при тесте достаточно любой строки
    role: 'CUSTOMER',
  });
  console.log('Создан:', newUser);

  console.log('--- Ищем пользователя по e-mail ---');
  const foundByEmail = await userRepo.getByEmail('test@example.com');
  console.log('Найден по e-mail:', foundByEmail);

  console.log('--- Ищем пользователя по ID ---');
  const foundById = await userRepo.getById(newUser.id);
  console.log('Найден по ID:', foundById);
}

// Запускаем тест
testUserRepo()
  .then(() => {
    console.log('Тест завершён успешно');
    process.exit(0);
  })
  .catch(err => {
    console.error('Ошибка в тесте:', err);
    process.exit(1);
  });
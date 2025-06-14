// frontend/src/features/auth/authAPI.ts

import api from '../../api/api';

// Интерфейс того, что возвращает бэкенд при регистрации
export interface RegisterResponse {
  id: number;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
}

// Интерфейс того, что возвращает бэкенд при логине
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: 'ADMIN' | 'CUSTOMER';
  };
}

// DTO для регистрации
export interface RegisterDTO {
  email: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER';
}

// DTO для логина
export interface LoginDTO {
  email: string;
  password: string;
}

// Функция регистрации — возвращает Promise<RegisterResponse>
export const registerUser = async (
  data: RegisterDTO
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/auth/register', data);
  return response.data;
};

// Функция логина — возвращает Promise<LoginResponse>
export const loginUser = async (data: LoginDTO): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};
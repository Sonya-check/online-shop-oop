// frontend/src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authAPI';

interface User {
  id: number;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
}

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  id: number;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
}

interface AuthState {
  token: string | null;
  user: User | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user')
    ? (JSON.parse(localStorage.getItem('user')!) as User)
    : null,
  status: 'idle',
  error: null,
};

// 1) Регистрация пользователя
export const registerAsync = createAsyncThunk<
  RegisterResponse,                                     // что возвращаем
  { email: string; password: string; role: 'ADMIN' | 'CUSTOMER' } // тип аргумента
>(
  'auth/register',
  // Здесь мы явно указываем payload: { email, password, role }
  async (payload: { email: string; password: string; role: 'ADMIN' | 'CUSTOMER' }) => {
    const data = await registerUser(payload);
    return data;
  }
);

// 2) Логин пользователя
export const loginAsync = createAsyncThunk<
  LoginResponse,                      // что возвращаем
  { email: string; password: string } // тип аргумента
>(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    const data = await loginUser(payload);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // registerAsync
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Registration error';
      })
      // loginAsync
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = 'idle';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
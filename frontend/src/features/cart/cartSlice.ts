// frontend/src/features/cart/cartSlice.ts

import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  getCartItems,
  addToCart,
  removeFromCart,
  AddToCartDTO,
} from './cartAPI';
import { RootState } from '../../app/store';
import { CartItem } from '../../types';

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

// 1) Получить содержимое корзины
export const getCartItemsAsync = createAsyncThunk<
  CartItem[],      // что возвращаем
  void,            // аргумент
  { state: RootState; rejectValue: string }
>('cart/fetchAll', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) {
    return rejectWithValue('No auth token');
  }
  try {
    const data = await getCartItems(token);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// 2) Добавить товар в корзину
export const addToCartAsync = createAsyncThunk<
  CartItem,                  // что возвращаем
  AddToCartDTO,              // аргумент
  { state: RootState; rejectValue: string }
>('cart/add', async (payload, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) {
    return rejectWithValue('No auth token');
  }
  try {
    const data = await addToCart(token, payload);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// 3) Удалить товар из корзины
export const removeFromCartAsync = createAsyncThunk<
  number,           // вернём удалённый productId
  number,           // аргумент: productId
  { state: RootState; rejectValue: string }
>('cart/remove', async (productId, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) {
    return rejectWithValue('No auth token');
  }
  try {
    await removeFromCart(token, productId);
    return productId;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // getCartItemsAsync
    builder
      .addCase(getCartItemsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getCartItemsAsync.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.status = 'idle';
          state.items = action.payload;
        }
      )
      .addCase(getCartItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Fetch cart failed';
      });

    // addToCartAsync
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        addToCartAsync.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.status = 'idle';
          // если уже есть товар с таким product.id — обновляем quantity
          const idx = state.items.findIndex(
            (ci) => ci.product.id === action.payload.product.id
          );
          if (idx >= 0) {
            state.items[idx].quantity = action.payload.quantity;
          } else {
            state.items.push(action.payload);
          }
        }
      )
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Add to cart failed';
      });

    // removeFromCartAsync
    builder
      .addCase(removeFromCartAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        removeFromCartAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = 'idle';
          state.items = state.items.filter(
            (ci) => ci.product.id !== action.payload
          );
        }
      )
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Remove from cart failed';
      });
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
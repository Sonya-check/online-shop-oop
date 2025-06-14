// frontend/src/features/orders/ordersSlice.ts
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import { createOrder, getOrders } from './ordersAPI';
import { RootState } from '../../app/store';
import { Order } from '../../types';

interface OrdersState {
  items: Order[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  status: 'idle',
  error: null,
};

// Thunk: получить список заказов
export const getOrdersAsync = createAsyncThunk<
  Order[],           // возвращаемый тип: Order[]
  void,              // аргумент без данных
  { state: RootState; rejectValue: string }
>('orders/fetchAll', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) {
    return rejectWithValue('No auth token');
  }
  try {
    const data = await getOrders(token);
    return data; // Order[]
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Thunk: создать новый заказ (Checkout)
export const createOrderAsync = createAsyncThunk<
  Order,             // возвращаемый тип: Order
  void,              // аргумент без данных
  { state: RootState; rejectValue: string }
>('orders/create', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) {
    return rejectWithValue('No auth token');
  }
  try {
    const data = await createOrder(token);
    return data; // Order
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrdersState(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // getOrdersAsync
    builder
      .addCase(getOrdersAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getOrdersAsync.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.status = 'idle';
          state.items = action.payload;
        }
      )
      .addCase(getOrdersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Fetch orders failed';
      });

    // createOrderAsync
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        createOrderAsync.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.status = 'idle';
          state.items.push(action.payload);
        }
      )
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Create order failed';
      });
  },
});

export const { clearOrdersState } = ordersSlice.actions;
export default ordersSlice.reducer;
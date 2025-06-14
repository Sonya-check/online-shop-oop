// frontend/src/features/products/productsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, createProduct, CreateProductDTO } from './productsAPI';
import { RootState } from '../../app/store';
import { Product } from '../../types';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const getProductsAsync = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => {
    const data = await fetchProducts();
    return data;
  }
);

export const addProductAsync = createAsyncThunk<
  Product,
  CreateProductDTO,
  { state: RootState; rejectValue: string }
>('products/add', async (payload, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) {
    return rejectWithValue('No auth token');
  }
  try {
    const data = await createProduct(payload, token);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProductsAsync.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Fetch products failed';
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addProductAsync.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Create product failed';
      });
  },
});

export default productsSlice.reducer;
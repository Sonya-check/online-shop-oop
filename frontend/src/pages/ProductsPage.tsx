import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getProductsAsync,
  addProductAsync,
} from '../features/products/productsSlice';
import { addToCartAsync } from '../features/cart/cartSlice';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(state => state.products);
  const { user, token } = useAppSelector(state => state.auth);

  // Поля для создания товара (ADMIN)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      dispatch(addProductAsync({ name, description, price }));
      setName('');
      setDescription('');
      setPrice(0);
    }
  };

  const handleAddToCart = (productId: number) => {
    if (token) {
      dispatch(addToCartAsync({ productId, quantity: 1 }));
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Products</h2>

      {user?.role === 'ADMIN' && (
        <form onSubmit={handleCreate} style={{ marginBottom: '1rem' }}>
          <h3>Create New Product</h3>
          <div style={{ marginBottom: '0.5rem' }}>
            <label>
              Name:{' '}
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <label>
              Description:{' '}
              <input
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </label>
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <label>
              Price:{' '}
              <input
                type="number"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                required
                step="0.01"
              />
            </label>
          </div>
          <button type="submit" disabled={status === 'loading'}>
            Create
          </button>
        </form>
      )}

      {status === 'loading' && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((prod: Product) => (
          <li key={prod.id} style={{ marginBottom: '0.5rem' }}>
            <strong>{prod.name}</strong> — {prod.description} — $
            {prod.price.toFixed(2)}{' '}
            {user && (
              <button
                onClick={() => handleAddToCart(prod.id)}
                style={{ marginLeft: '1rem' }}
              >
                Add to Cart
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
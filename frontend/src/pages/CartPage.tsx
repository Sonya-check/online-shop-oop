import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getCartItemsAsync,
  removeFromCartAsync,
} from '../features/cart/cartSlice';
import { createOrderAsync } from '../features/orders/ordersSlice';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useAppSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCartItemsAsync());
  }, [dispatch]);

  const handleRemove = (productId: number) => {
    dispatch(removeFromCartAsync(productId));
  };

  const handleCheckout = () => {
    dispatch(createOrderAsync()).then(() => {
      navigate('/orders');
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Cart</h2>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(ci => (
          <li key={ci.id} style={{ marginBottom: '0.5rem' }}>
            {ci.product.name} × {ci.quantity} = $
            {(ci.product.price * ci.quantity).toFixed(2)}{' '}
            <button onClick={() => handleRemove(ci.product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {items.length > 0 ? (
        <button onClick={handleCheckout}>Checkout</button>
      ) : (
        <p>Cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
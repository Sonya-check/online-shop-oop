import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getOrdersAsync } from '../features/orders/ordersSlice';
import { Order } from '../types';

const OrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(state => state.orders);

  useEffect(() => {
    dispatch(getOrdersAsync());
  }, [dispatch]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Orders</h2>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {items.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        items.map((order: Order) => (
          <div
            key={order.id}
            style={{
              border: '1px solid #ccc',
              marginBottom: '1rem',
              padding: '0.5rem',
            }}
          >
            <h3>
              Order #{order.id} — ${order.total.toFixed(2)}
            </h3>
            <p>Created at: {new Date(order.createdAt).toLocaleString()}</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {order.orderItems.map(oi => (
                <li key={oi.id}>
                  {oi.product.name} × {oi.quantity} = ${oi.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
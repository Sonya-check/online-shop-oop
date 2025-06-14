import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const cartItems = useAppSelector(state => state.cart.items);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/products">Products</Link> |{' '}
        {user && (
          <>
            <Link to="/cart">Cart ({cartItems.length})</Link> | <Link to="/orders">Orders</Link> |{' '}
          </>
        )}
        {!user ? (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {user.role === 'ADMIN' && <Link to="/products/new">Create Product</Link>} |{' '}
            <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
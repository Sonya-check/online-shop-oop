import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerAsync } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'CUSTOMER'>('CUSTOMER');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerAsync({ email, password, role }));
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Email:{' '}
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Password:{' '}
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Role:{' '}
            <select
              value={role}
              onChange={e => setRole(e.target.value as 'ADMIN' | 'CUSTOMER')}
            >
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </label>
        </div>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Loading...' : 'Register'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
    </div>
  );
};

export default RegisterPage;
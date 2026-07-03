import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();
  async function handleLogin(e) {
    e.preventDefault(); setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      setUser({ token: res.data.token, roles: payload.roles, email: payload.email, tenantId: payload.tenantId });
      navigate('/tasks');
    } catch (err) {
      setError('Invalid credentials');
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Login</button>
      {error && <div>{error}</div>}
    </form>
  )
}

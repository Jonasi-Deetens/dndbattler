import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService.tsx';
import axios from 'axios';

interface ErrorData {
    msg: string
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await login({ email, password });
      navigate('/login');
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
            const errorData: ErrorData = err.response.data;
            setError(errorData.msg);
        } else {
            setError('An unexpected error occurred');
        }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
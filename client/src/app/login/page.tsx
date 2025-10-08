"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from '../auth.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Login() {
  const { login } = useAuth(); // Get the login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Login successful! Redirecting...');
      login(data.token); // Use the context function to handle login

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);

    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
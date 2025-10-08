// src/components/AddItemForm.tsx
"use client";
import { useState } from 'react';
import styles from '../app/auth.module.css';
import { encryptData } from '@/utils/encryption';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// This defines a function prop that the component will receive
interface AddItemFormProps {
  onItemAdded: () => void;
}

export default function AddItemForm({ onItemAdded }: AddItemFormProps) {
  const [item, setItem] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const encryptedPassword = encryptData(item.password);

    // We will add client-side encryption here in the next step
    const itemToSave = {
      title: item.title,
      username: item.username,
      password_encrypted: encryptedPassword, // For now, we send it directly
      url: item.url
    };

    await fetch(`${API_URL}/api/vault`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token || '',
      },
      body: JSON.stringify(itemToSave),
    });

    setItem({ title: '', username: '', password: '', url: '' }); // Clear the form
    onItemAdded(); // Tell the parent page to re-fetch the list
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm} style={{ marginBottom: '2rem' }}>
      <h3>Add New Item</h3>
      <input name="title" value={item.title} onChange={handleChange} placeholder="Title (e.g., Gmail)" required />
      <input name="username" value={item.username} onChange={handleChange} placeholder="Username or Email" required />
      <input name="password" value={item.password} onChange={handleChange} placeholder="Password" required />
      <input name="url" value={item.url} onChange={handleChange} placeholder="URL (optional)" />
      <button type="submit">Save Item</button>
    </form>
  );
}
// src/components/VaultItem.tsx
"use client";
import { useState } from 'react';
import { decryptData, encryptData } from '@/utils/encryption';
import styles from '../app/auth.module.css';

export default function VaultItem({ item, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: item.title,
    username: item.username,
    password: '', // Password field starts empty for editing
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [decryptedPassword, setDecryptedPassword] = useState('');

  const handleShowPassword = () => {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
    } else {
      setDecryptedPassword(decryptData(item.password_encrypted));
      setIsPasswordVisible(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Encrypt the new password if it was changed
    const encryptedPassword = encryptData(editData.password);

    const response = await fetch(`http://localhost:3001/api/vault/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token || '',
      },
      body: JSON.stringify({
        title: editData.title,
        username: editData.username,
        password_encrypted: encryptedPassword,
      }),
    });

    const updatedItemData = await response.json();
    onUpdate(updatedItemData); // Lift state up
    setIsEditing(false); // Exit edit mode
  };

  if (isEditing) {
    // --- EDIT MODE ---
    return (
      <form onSubmit={handleUpdate} className={styles.authForm} style={{ marginBottom: '1rem', backgroundColor: '#fffbe6' }}>
        <input name="title" value={editData.title} onChange={handleChange} placeholder="Title" />
        <input name="username" value={editData.username} onChange={handleChange} placeholder="Username" />
        <input name="password" value={editData.password} onChange={handleChange} placeholder="New Password" />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEditing(false)} style={{ backgroundColor: '#6c757d', marginTop: '10px' }}>
          Cancel
        </button>
      </form>
    );
  }

  // --- VIEW MODE ---
  return (
    <div className={styles.authForm} style={{ marginBottom: '1rem' }}>
      <h3>{item.title}</h3>
      <p>Username: {item.username}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <p>Password: {isPasswordVisible ? decryptedPassword : '••••••••'}</p>
        <button onClick={handleShowPassword} style={{ fontSize: '0.8rem', padding: '5px' }}>
          {isPasswordVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(item._id)} style={{ backgroundColor: '#dc3545' }}>
          Delete
        </button>
      </div>
    </div>
  );
}
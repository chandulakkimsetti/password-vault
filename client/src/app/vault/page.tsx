// src/app/vault/page.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import AddItemForm from '@/components/AddItemForm';
import VaultItem from '@/components/VaultItem';
import styles from '../auth.module.css';

interface VaultItem {
  _id: string;
  title: string;
  username: string;
}

export default function VaultPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchItems = useCallback(async () => {
    if (token) {
      try {
        const response = await fetch('http://localhost:3001/api/vault', {
          headers: { 'x-auth-token': token },
        });
        const data = await response.json();
        if (response.ok) setItems(data);
      } catch (error) {
        console.error("Failed to fetch vault items:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDeleteItem = async (id: string) => {
    if (!token) return;

    await fetch(`http://localhost:3001/api/vault/${id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token,
      },
    });

    // Update the UI by filtering out the deleted item
    setItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const handleItemUpdated = (updatedItem: VaultItem) => {
    setItems(prevItems => 
      prevItems.map(item => item._id === updatedItem._id ? updatedItem : item)
    );
  };

  // --- NEW FILTER LOGIC ---
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (!token) return <p>Please log in to view your vault.</p>;

  return (
    <div className={styles.authContainer}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h2>My Vault</h2>
        <AddItemForm onItemAdded={fetchItems} />

        {/* --- NEW SEARCH BAR --- */}
        <div style={{ margin: '2rem 0' }}>
          <input
            type="text"
            placeholder="Search by title or username..."
            className={styles.searchInput} // We'll add this style
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredItems.length === 0 ? (
          <p>No items found.</p>
        ) : (
          filteredItems.map(item => (
            <VaultItem 
              key={item._id} 
              item={item} 
              onDelete={handleDeleteItem} 
              onUpdate={handleItemUpdated}
            />
          ))
        )}
      </div>
    </div>
  );
}
// src/components/Navbar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useAuth } from '@/context/AuthContext';

export default function AppNavbar() {
  const { token, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <Link className={styles.navbarBrand} href="/">
        Password Vault
      </Link>
      <div className={styles.navbarLinks}>
        <Link href="/">Home</Link>
        {token ? (
          <>
            <Link href="/vault">My Vault</Link> {/* <-- ADD THIS LINK */}
            <button onClick={logout} className={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
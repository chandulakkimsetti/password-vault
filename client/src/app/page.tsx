// src/app/page.tsx
import styles from './page.module.css';
import PasswordGenerator from '@/components/PasswordGenerator'; // Import the new component

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Password Generator + Secure Vault</h1>
      <PasswordGenerator /> {/* Render the new component */}
    </main>
  );
}
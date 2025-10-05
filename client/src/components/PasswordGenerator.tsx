"use client";

import { useState, useEffect } from 'react';
import styles from './PasswordGenerator.module.css';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeLookalikes: true,
  });
  const [copied, setCopied] = useState(false);
  const [generateTrigger, setGenerateTrigger] = useState(0);

  useEffect(() => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersCharset = "0123456789";
    const symbolsCharset = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    if (options.includeUppercase) charset += uppercaseCharset;
    if (options.includeNumbers) charset += numbersCharset;
    if (options.includeSymbols) charset += symbolsCharset;

    if (options.excludeLookalikes) {
      charset = charset.replace(/[l1IO0]/g, '');
    }

    if (charset.length === 0) {
        setPassword("Select at least one option");
        return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);

  }, [length, options, generateTrigger]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setOptions(prevOptions => ({ ...prevOptions, [name]: checked }));
  };

  const handleGenerateClick = () => {
    setGenerateTrigger(prev => prev + 1);
  };

  const handleCopy = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.generatorContainer}>
      <h2>Password Generator</h2>
      <div className={styles.passwordDisplay}>
        <p>{password}</p>
        <button onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label>Length: {length}</label>
          <input 
            type="range" 
            min="8" 
            max="32" 
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
        <div className={styles.control}>
          <input type="checkbox" name="includeUppercase" checked={options.includeUppercase} onChange={handleOptionChange} />
          <label>Include Uppercase</label>
        </div>
        <div className={styles.control}>
          <input type="checkbox" name="includeNumbers" checked={options.includeNumbers} onChange={handleOptionChange} />
          <label>Include Numbers</label>
        </div>
        <div className={styles.control}>
          <input type="checkbox" name="includeSymbols" checked={options.includeSymbols} onChange={handleOptionChange} />
          <label>Include Symbols</label>
        </div>
        <div className={styles.control}>
          <input type="checkbox" name="excludeLookalikes" checked={options.excludeLookalikes} onChange={handleOptionChange} />
          <label>Exclude Look-Alikes (l, 1, I, O, 0)</label>
        </div>
        <button className={styles.generateButton} onClick={handleGenerateClick}>Generate</button>
      </div>
    </div>
  );
}
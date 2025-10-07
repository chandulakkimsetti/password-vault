// src/utils/encryption.ts
import CryptoJS from 'crypto-js';

// WARNING: In a real-world app, this secret key should be derived from the user's master password
// and not hardcoded. For this project, we'll keep it simple.
const SECRET_KEY = 'my-super-secret-key-for-this-project';

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
# 🔒 Password Vault

A full-stack, secure password manager built with Next.js, Node.js, and MongoDB, featuring client-side encryption to ensure that plaintext passwords are never stored on the server.

---

## 🚀 Live Demo

* **Front-End (Vercel):** `https://password-vault-two-tawny.vercel.app/`
* **Back-End (Render):** `https://password-vault-api-rc2u.onrender.com`

---

## ✨ Features

* **Secure Authentication:** User registration and login with hashed passwords and JWTs.
* **Password Generator:** Creates strong, random passwords with customizable options.
* **Secure Vault:** Full CRUD functionality to save, view, update, and delete password entries.
* **Client-Side Encryption:** Vault items are encrypted in the browser before being sent to the server using AES.
* **Search & Filter:** Easily find saved items by title or username.
* **Copy to Clipboard:** Securely copy passwords to the clipboard.

---

## 🛠️ Tech Stack

* **Front-End:** Next.js, React, TypeScript
* **Back-End:** Node.js, Express.js, TypeScript
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT (JSON Web Tokens), bcryptjs
* **Encryption:** crypto-js (AES)
* **Deployment:** Vercel (Client), Render (Server)

---

## 🏃 How to Run Locally

This project is a monorepo containing a separate back-end server and a front-end client. You will need to run them in two separate terminals.

### **Prerequisites**
* Node.js (v18 or later)
* npm
* A free MongoDB Atlas account

### **1. Back-End Setup (Server)**

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create an environment file:** Create a new file named `.env` in the `server` directory.
4.  **Add environment variables:** Open the `.env` file and add the following variables, replacing the placeholder values with your own:
    ```env
    DATABASE_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@...
    JWT_SECRET=YOUR_OWN_SUPER_SECRET_KEY
    ```
5.  **Start the server:**
    ```bash
    npm start
    ```
    The back-end server will start on `http://localhost:3001`.

### **2. Front-End Setup (Client)**

1.  **Open a new terminal.**
2.  **Navigate to the client directory:**
    ```bash
    cd client
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the client:**
    ```bash
    npm run dev
    ```
    The front-end application will start on `http://localhost:3000`.
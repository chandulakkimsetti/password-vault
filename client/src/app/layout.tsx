import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppNavbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext"; // 1. Import the provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Password Vault",
  description: "A secure password vault",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* 2. Wrap your components */}
          <AppNavbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
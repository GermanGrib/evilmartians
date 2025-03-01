import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../assets/globals.css";
import { ReactNode } from "react";
import Header from "@/components/header";
import { AuthProvider } from "@/store/auth-context";
import MobileMenu from "@/components/mobile-menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evil Martians",
  description: "Super login form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          <main className="flex-grow relative">{children}</main>
          <MobileMenu />
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Demo PWA Emailify",
  description:
    "Emailify is a PWA that allows you to send emails from your browser.",
  manifest: "/manifest.json",
  themeColor: "#100c08",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Demo PWA Emailify"
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    shortcut: "/images/icons/icon-192x192.png",
    apple: [
      { url: "/images/icons/icon-192x192.png" },
      { url: "/images/icons/icon-512x512.png", sizes: "512x512" }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

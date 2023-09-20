import { AuthModal, Navbar } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pinterest Clone",
  description: "Pinterest clone is made for education purpose",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            storageKey='pinterest-theme'
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <AuthModal />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "../style/globals.css";
import { Header } from "../components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Katalog",
  description: "The Everything Everyday App",
  icons: {
    icon: "/image/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-grow bg-neutral-50 pb-12">
          {children}
        </main>
        
      </body>
    </html>
  );
}

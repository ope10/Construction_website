import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    template: '%s | StructuraNext Engineering & Architecture',
    default: 'StructuraNext | Modern Enterprise Construction & Architectural Design Platform',
  },
  description: 'High-performance civil engineering, sustainable architectural designs, and premium commercial construction. Discover our advanced bidding portal and estimate intake system.',
  keywords: 'structural engineering, construction bids, commercial architecture, residential builders, sustainable building, mass timber design, drafting blueprints',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

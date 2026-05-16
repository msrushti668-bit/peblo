import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peblo — AI-Powered Note Taking",
  description:
    "Turn your unstructured notes into actionable insights with Peblo's AI engine. Summarize, extract tasks, and stay productive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className={`${inter.className} min-h-full flex flex-col bg-zinc-950 text-zinc-50`}>
        {children}
      </body>
    </html>
  );
}

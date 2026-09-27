import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Preloader } from "@/components/layout/Preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kirtan Kankotiya | Portfolio",
  description: "Software Engineer — Flutter · Backend · AI/ML. I build cross-platform apps and intelligent systems.",
  openGraph: {
    title: "Kirtan Kankotiya | Software Engineer",
    description: "Software Engineer — Flutter · Backend · AI/ML",
    url: "https://kirtankankotiya.com",
    siteName: "Kirtan Kankotiya Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Preloader />
          <SmoothScrollProvider>
            <CustomCursor />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

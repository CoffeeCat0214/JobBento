import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Job Matcher - Find Your Perfect Match",
  description: "Upload your resume and get matched with the latest software engineering jobs from top platforms like LinkedIn, Indeed, Glassdoor, and CareerBrew.",
  keywords: ["job matching", "resume parser", "software engineering jobs", "career search", "kawaii", "ai matching"],
  authors: [{ name: "Resume Job Matcher" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

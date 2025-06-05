import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotificationBell from "@/components/NotificationBell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduQuest",
  description: "Learn about Sustainable Development Goals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Top Navigation Bar */}
        <div className="fixed top-0 right-0 p-4 z-50">
          <NotificationBell />
        </div>
        {children}
      </body>
    </html>
  );
}

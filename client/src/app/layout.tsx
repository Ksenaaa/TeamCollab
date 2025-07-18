import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import prisma from "@/lib/prisma";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import { SessionProviderWrapper } from "@/components/sessionProvider/SessionProviderWrapper";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Task Board",
  description: "Dashboard for your projects",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const projects = await prisma.project.findMany();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProviderWrapper>
          <div className="h-screen flex flex-row">
            <Sidebar projects={projects} />
            <main className="flex-1 p-2 md:p-8 overflow-auto">
              {children}
              <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </main>
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

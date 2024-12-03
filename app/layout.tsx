import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pakistan Smog Dasboard",
  description: "Stay up to date with the latest information",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const queryClient = new QueryClient();
  return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="flex">
            <QueryProvider>
              <SidebarProvider>
                  <AppSidebar />
                  <main>
                    {children}
                  </main>
                </SidebarProvider>
            </QueryProvider>
          </div>
        </body>
      </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MessageHistoryStoreProvider } from "@/providers/messageHistoryStoreProvider";
import { fetchMessageHistory } from "@/actions/fetchMessageHistory";
import { CurrentChatStoreProvider } from "@/providers/currentChatStoreProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CDE Chat Bot",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { history, error } = await fetchMessageHistory();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <CurrentChatStoreProvider>
          <MessageHistoryStoreProvider
            initialData={{ messageHistory: history }}
            error={error}
          >
            {children}
            <Toaster />
          </MessageHistoryStoreProvider>
        </CurrentChatStoreProvider>
      </body>
    </html>
  );
}

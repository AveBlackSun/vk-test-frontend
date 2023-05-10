"use client";
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const qq = new QueryClient();
export const metadata = {
  title: "KAM",
  description: "KAM",
};

const RootLayout = ({ children, session }) => {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen text-black">
        <QueryClientProvider client={qq}>
          <SessionProvider session={session}>
            <Header />

            <div className="container flex mx-auto w-full xl:w-1/2">
              <Sidebar />
              <main className="container mx-auto flex justify-between min-h-full pt-10 ">
                {children}
              </main>
            </div>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;

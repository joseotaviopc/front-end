import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { NextAuthProvider } from "@/providers/auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TechRoom BR",
  description: "TechRoom BR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <ToastContainer
          autoClose={1500}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}

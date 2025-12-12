import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/components/sessionAuth";
import { Toaster } from "@/components/ui/sonner"
import { QueryClientContext } from "@/services/tanstek-requisicao";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NailTime - Encontre as melhores profissionais de unhas em um único local!",
  description: "Nós somos uma plataforma para manicures e designers de unhas com foco em agilizar seu atendimento de forma simplificada e organizada.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title: "NailTime - Encontre as melhores profissionais de unhas em um único local!",
    description: "Nós somos uma plataforma para manicures e designers de unhas com foco em agilizar seu atendimento de forma simplificada e organizada.",
    // Lembre-se de criar essa imagem e colocar na pasta /public
    images: [`${process.env.NEXT_PUBLIC_URL}/img_manicure_2 (1).png`],
  }
};

export default function RootLayout({

  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >

        <SessionAuthProvider>

          <QueryClientContext>
            {children}
            <Toaster />
          </QueryClientContext>
        </SessionAuthProvider>

      </body>
    </html>
  );
}

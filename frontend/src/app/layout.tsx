"use client";
import Header from "@/features/Header";
import "./globals.css";
import { usePathname } from "next/navigation";
import { ModalProvider } from "@/provider/ModalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const routes = ["/Home", "/Profile"];
  const pathname = usePathname();
  const router = routes.some((route) => pathname.startsWith(route));
  return (
    <html lang="en">
      <body className="bg-white">
        <ModalProvider>
          {router ? <Header /> : <></>}
          <main>{children}</main>
        </ModalProvider>
      </body>
    </html>
  );
}

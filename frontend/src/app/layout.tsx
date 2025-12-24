import AuthProvider from "@/hooks/useAuth";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

import { AuthProvider } from "@/contexts/authContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}

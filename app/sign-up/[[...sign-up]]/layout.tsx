import React from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center min-h-screen pt-20">{children}</main>
  );
}

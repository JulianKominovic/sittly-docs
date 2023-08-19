import { Inter, Montserrat } from "@next/font/google";
import React from "react";
import "./global.css";
import Link from "next/link";
import Image from "next/image";
import blurryShapes from "../assets/images/deco.jpg";
import Github from "../components/icons/Github";
import { ClerkProvider } from "@clerk/nextjs";
import UserButton from "../components/UserButton";

export const metadata = {
  title: "Sittly Launcher - Fast and lightweight launcher for Linux X11",
  description:
    "Sittly is like Raycast, Spotlight or Albert for Linux X11. It is fast, lightweight and easy to use. It is written in Rust and uses React. It is open source and free to use.",
};
// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["700"],
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
        <body className="w-full overflow-x-hidden bg-slate-100">
          <nav className="sticky top-0 left-0 w-full bg-slate-100 bg-opacity-90 saturate-150 backdrop-blur-md">
            <ul className="flex max-w-lg px-2 mx-auto">
              <li className="self-center px-2 py-4">
                <a href="/">Home</a>
              </li>
              <li className="self-center px-2 py-4">
                <Link href="/store">Store</Link>
              </li>
              <li className="self-center flex-grow px-2 py-4">
                <Link href="/docs">Docs</Link>
              </li>
              <li className="flex items-center self-center gap-4 px-2 py-4">
                <UserButton />
              </li>
            </ul>
          </nav>
          <div className="w-full bg-slate-100 bg-opacity-90">
            <main className="w-full max-w-lg p-4 pb-20 mx-auto">
              {children}
            </main>
          </div>
          <Image
            loading="eager"
            priority={false}
            src={blurryShapes.src}
            alt=""
            aria-hidden
            width={1920}
            height={1080}
            className="fixed top-0 left-0 object-cover w-full h-screen opacity-60 -z-10"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
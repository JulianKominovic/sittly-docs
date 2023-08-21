import { Inter, Montserrat } from "@next/font/google";
import React from "react";
import "./global.css";
import Link from "next/link";
import Image from "next/image";
import blurryShapes from "../assets/images/deco.jpg";
import { ClerkProvider } from "@clerk/nextjs";
import UserButton from "../components/UserButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sittly Launcher - Fast and lightweight launcher for Linux X11",
  description:
    "Sittly is like Raycast, Spotlight or Albert for Linux X11. It is fast, lightweight and easy to use. It is written in Rust and uses React. It is open source and free to use.",
  twitter: {
    creator: "@juliankominovic",
    description:
      "Sittly is like Raycast, Spotlight or Albert for Linux X11. It is fast, lightweight and easy to use. It is written in Rust and uses React. It is open source and free to use.",
    title: "Sittly Launcher - Fast and lightweight launcher for Linux X11",
    images: ["/images/sittly-banner.png"],
  },
  authors: [{ name: "Julian Kominovic", url: "https://jkominovic.vercel.app" }],
  category: "Software Development",
  creator: "Julian Kominovic",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    countryName: "Argentina",
    description:
      "Sittly is like Raycast, Spotlight or Albert for Linux X11. It is fast, lightweight and easy to use. It is written in Rust and uses React. It is open source and free to use.",
    images: [{ url: "/images/sittly-banner.png" }],
    locale: "en_US",
    title: "Sittly Launcher - Fast and lightweight launcher for Linux X11",
    emails: ["juliankominovic@gmail.com"],
  },
  keywords: [
    "sittly",
    "launcher",
    "linux",
    "x11",
    "raycast",
    "spotlight",
    "albert",
    "rust",
    "react",
    "open source",
    "free",
    "fast",
    "lightweight",
    "tauri",
  ],
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
          <nav className="sticky top-0 left-0 z-40 w-full bg-slate-100 bg-opacity-90 saturate-150 backdrop-blur-md">
            <ul className="flex flex-wrap max-w-lg px-2 mx-auto">
              <li className="self-center px-2 py-4">
                <a href="/">Home</a>
              </li>
              <li className="self-center px-2 py-4">
                <Link href="/store">Store</Link>
              </li>
              <li className="self-center flex-grow px-2 py-4">
                <Link href="/docs">Docs</Link>
              </li>
              <li className="self-center px-2 py-4">
                <Link href="/backoffice">My extensions</Link>
              </li>
              <li className="flex items-center self-center gap-4 px-2 py-4">
                <UserButton />
              </li>
            </ul>
          </nav>
          <div className="w-full bg-slate-100 bg-opacity-90">{children}</div>
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

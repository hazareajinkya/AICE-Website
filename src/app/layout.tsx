import type { Metadata } from "next";
import { Oswald, Playfair_Display, Inter, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "AICE | AI Center of Excellence",
  description: "Executive AI Leadership Masterclass",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${playfair.variable} ${inter.variable} ${outfit.variable} antialiased bg-black text-white`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}


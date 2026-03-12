import "./globals.css";
import { Metadata } from "next";
import { JetBrains_Mono, Pixelify_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ParallaxGrid from "@/components/effects/ParallaxGrid";

const fontPixel = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: ["400", "500", "600", "700"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "KHOA.DEV — Fullstack Developer",
  description: "Tu Minh Khoa — Fullstack Developer based in Ho Chi Minh City. Building scalable systems and web applications.",
  openGraph: {
    title: "KHOA.DEV — Fullstack Developer",
    description: "Tu Minh Khoa — Fullstack Developer. C#, .NET, TypeScript, React.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fontPixel.variable} ${fontMono.variable} font-mono bg-retro-dark text-retro-tan bg-pixel-grid scanlines`}>
        <ParallaxGrid />
        <Nav />
        <main className="min-h-screen pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

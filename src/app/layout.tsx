
import "./globals.css";
import { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";


const fontPixel = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: "400",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Dev_Console :: Portfolio",
  description: "Backend & Systems Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontPixel.variable} ${fontMono.variable} antialiased text-green-400`}>
        <main className="min-h-screen p-4 md:p-8 font-mono selection:bg-green-400 selection:text-black">
          {children}
        </main>
      </body>
    </html>
  );
}

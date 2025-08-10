import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Cormorant_Garamond, Cinzel, Great_Vibes } from "next/font/google";

const bodySerif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400","500","600","700"] });
export const metadata: Metadata = {
  title: "Subie's 21st – Denim & Diamonds",
  description: "A glamorous denim & diamonds birthday invitation for Olasubomi",
  openGraph: {
    title: "Subie's 21st – Denim & Diamonds",
    description: "A glamorous denim & diamonds birthday invitation",
    images: ["/og.jpg"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};
export const viewport: Viewport = { themeColor: "#1e3a6b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`min-h-screen bg-denim bg-[length:16px_16px] text-silver-100 antialiased ${bodySerif.className}`}>
        <div className="bg-sparkles bg-[size:100%_100%]">{children}</div>
      </body>
    </html>
  );
}

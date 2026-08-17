import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_TC({ variable: "--font-noto", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "國際通沿途情報｜沖繩員旅地圖",
  description: "以唐吉訶德國際通店示範的沖繩旅遊情報互動地圖。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body className={noto.variable}>{children}</body></html>;
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Timeboxing Planner",
  description: "Elon Musk 방식 타임박스 플래너 - 하루를 완벽하게 계획하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

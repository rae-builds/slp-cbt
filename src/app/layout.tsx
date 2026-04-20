import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "언어재활사 CBT 연습 서비스",
  description: "국가시험 대비 CBT 연습 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Anaheim, Alkalami, Chivo_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
const anaheim = Anaheim({ subsets: ["latin"], variable: "--font-sans" });
const alkalami = Alkalami({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});
const chivoMono = Chivo_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "MOJI Learn – Online Course Platform & Learning Management System",
  description:
    "MOJI Learn is a modern LMS course platform that empowers instructors to create and sell online courses. Students can discover, enroll, and learn from thousands of courses across various subjects. A comprehensive learning management system for online education.",
  keywords:
    "online course platform, LMS learning management system, online learning platform, course marketplace, online education, e-learning platform, teach online, learn online, course creation platform, online courses, Udemy alternative, course selling platform, student learning platform, instructor platform, online training platform, Nigeria online courses",
  metadataBase: new URL("https://moji-learn.miracleibharokhonre.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MOJI Learn – Online Course Platform & Learning Management System",
    description:
      "Discover thousands of online courses or create and sell your own. MOJI Learn is a comprehensive LMS platform connecting instructors and students for online learning. Join our course marketplace today.",
    url: "https://moji-learn.miracleibharokhonre.com",
    siteName: "MOJI Learn",
    images: [
      {
        url: "https://www.miracleibharokhonre.com/images/mylogo.png",
        width: 1200,
        height: 630,
        alt: "MOJI Learn Logo",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOJI Learn – Online Course Platform & Learning Management System",
    description:
      "A modern LMS course platform for instructors to create courses and students to learn. Join thousands of courses across various subjects.",
    images: ["https://www.miracleibharokhonre.com/images/mylogo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={(anaheim.variable, alkalami.variable, chivoMono.variable)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | MOJI Learn",
  description: "Reset your password to access your account.",
  alternates: {
    canonical: "/forgot-password",
  },
  openGraph: {
    title: "Forgot Password | MOJI Learn",
    description: "Reset your password to access your MOJI Learn account.",
    url: "https://moji-school.miracleibharokhonre.com/forgot-password",
    siteName: "MOJI Learn",
    type: "website",
    images: [
      {
        url: "https://www.miracleibharokhonre.com/images/mylogo.png", // Update if you have a specific OG image
        width: 1200,
        height: 630,
        alt: "MOJI Learn - Forgot Password",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forgot Password | MOJI Learn",
    description: "Reset your password to access your MOJI Learn account.",
    images: [
      "https://www.miracleibharokhonre.com/images/mylogo.png", // Update if you have a specific Twitter image
    ],
  },
};

function ForgotPasswordPage() {
  return (
    <section className="grid custom-container grid-cols-1 place-items-center min-h-dvh">
      <ForgotPasswordForm />
    </section>
  );
}
export default ForgotPasswordPage;

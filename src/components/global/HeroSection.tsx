import {
  SignedIn,
  SignedOut,
} from "@/features/auth/components/AuthStatusComponent";
import { LogoImage } from "./Logo";
import { Button } from "../ui/button";
import Link from "next/link";
import { Route } from "next";
import { UserSession } from "@/lib/auth-client";
import { Suspense } from "react";

function HeroSection() {
  return (
    <section className="relative  overflow-x-clip flex justify-center items-center min-h-dvh  mx-auto w-full max-w-[1800px]">
      <div className="flex flex-col  z-10 gap-10 max-w-[600px] justify-center items-center p-4 sm:p-6  ">
        <LogoImage />
        <h1 className="text-primary uppercase  relative text-center  text-3xl md:text-4xl font-bold lg:text-5xl ">
          MOJI Learn - Online Course Platform
        </h1>

        <Suspense fallback={null}>
          <SignedOut>
            <Button
              asChild
              className="font-medium font-dm text-base bg-secondary text-primary h-11 rounded-4xl px-6 w-max  hover:border-primary border border-transparent transition-colors hover:bg-secondary hover:text-primary group"
            >
              <Link href={"/sign-in"}>
                <span>Get Started</span>
              </Link>
            </Button>
          </SignedOut>
        </Suspense>
        <Suspense fallback={null}>
          <SignedIn>
            <Button
              asChild
              className="font-medium font-dm text-base bg-secondary text-primary h-11 rounded-4xl px-6 w-max  hover:border-primary border border-transparent transition-colors hover:bg-secondary hover:text-primary group"
            >
              <Link href={"/sign-in"}>
                <span>Get Started</span>
              </Link>
            </Button>
          </SignedIn>
        </Suspense>
      </div>
    </section>
  );
}
export default HeroSection;

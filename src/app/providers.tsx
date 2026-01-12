"use client";

import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NextTopLoader color="oklch(0.9645 0.0261 90.0969)" showSpinner={false} />
      {children}
      <Toaster position="bottom-right" richColors />
    </ThemeProvider>
  );
}

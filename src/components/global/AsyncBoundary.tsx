// components/AsyncBoundary.tsx
import { Suspense, ReactNode } from "react";

type AsyncBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function AsyncBoundary({
  children,
  fallback = null,
}: AsyncBoundaryProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

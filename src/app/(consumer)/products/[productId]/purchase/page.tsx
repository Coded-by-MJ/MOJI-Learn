import { LoadingSpinner } from "@/components/global/LoadingSpinner";
import { PageHeader } from "@/components/global/PageHeader";
import { db } from "@/drizzle/db";
import { ProductTable } from "@/drizzle/schema";
import { getProductIdTag } from "@/features/products/db/cache";
import { userOwnsProduct } from "@/features/products/db";
import { wherePublicProducts } from "@/features/products/permissions";
import { getAuthUserServer } from "@/features/users/actions";
import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import SignUpForm from "@/features/auth/components/SignUpForm";
import SignInForm from "@/features/auth/components/SigninForm";
import { env } from "@/data/env/client";
import { StripeCheckoutForm } from "@/services/stripe/components/StripeCheckoutForm";

export default function PurchasePage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ authMode: string }>;
}) {
  return (
    <Suspense fallback={<LoadingSpinner className="my-6 size-36 mx-auto" />}>
      <SuspendedComponent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function SuspendedComponent({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ authMode: string }>;
}) {
  const { productId } = await params;
  const user = await getAuthUserServer();
  const product = await getPublicProduct(productId);

  if (product == null) return notFound();

  if (user != null) {
    if (await userOwnsProduct({ userId: user.id, productId })) {
      redirect("/courses");
    }

    return (
      <div className="container my-6">
        <StripeCheckoutForm product={product} user={user} />
      </div>
    );
  }

  const { authMode } = await searchParams;
  const isSignUp = authMode === "signUp";

  return (
    <div className="container my-6 flex flex-col items-center">
      <PageHeader title="You need an account to make a purchase" />
      {isSignUp ? (
        <SignUpForm
          forceRedirectUrl={`${env.NEXT_PUBLIC_APP_URL}/products/${productId}/purchase`}
        />
      ) : (
        <SignInForm
          forceRedirectUrl={`${env.NEXT_PUBLIC_APP_URL}/products/${productId}/purchase`}
        />
      )}
    </div>
  );
}

async function getPublicProduct(id: string) {
  "use cache";
  cacheTag(getProductIdTag(id));

  return db.query.ProductTable.findFirst({
    columns: {
      name: true,
      id: true,
      imageUrl: true,
      description: true,
      priceInDollars: true,
    },
    where: and(eq(ProductTable.id, id), wherePublicProducts),
  });
}

import { PageHeader } from "@/components/global/PageHeader"
import { Button } from "@/components/ui/button"
import { db } from "@/drizzle/db"
import { PurchaseTable } from "@/drizzle/schema"
import {
  UserPurchaseTable,
  UserPurchaseTableSkeleton,
} from "@/features/purchases/components/UserPurchaseTable"
import { getPurchaseUserTag } from "@/features/purchases/db/cache"
import { getAuthUserServer } from "@/features/users/actions"
import { desc, eq } from "drizzle-orm"
import { cacheTag } from "next/cache"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default function PurchasesPage() {
  return (
    <div className="container my-6">
      <PageHeader title="Purchase History" />
      <Suspense fallback={<UserPurchaseTableSkeleton />}>
        <SuspenseBoundary />
      </Suspense>
    </div>
  )
}

async function SuspenseBoundary() {
  const user = await getAuthUserServer()
  if (user == null) return redirect("/sign-in")

  const purchases = await getPurchases(user.id)

  if (purchases.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-start">
        You have made no purchases yet
        <Button asChild size="lg">
          <Link href="/">Browse Courses</Link>
        </Button>
      </div>
    )
  }

  return <UserPurchaseTable purchases={purchases} />
}

async function getPurchases(userId: string) {
  "use cache"
  cacheTag(getPurchaseUserTag(userId))

  return db.query.PurchaseTable.findMany({
    columns: {
      id: true,
      pricePaidInCents: true,
      refundedAt: true,
      productDetails: true,
      createdAt: true,
    },
    where: eq(PurchaseTable.userId, userId),
    orderBy: desc(PurchaseTable.createdAt),
  })
}
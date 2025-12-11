import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema/auth";
import { eq } from "drizzle-orm";

export async function insertUser(data: typeof UserTable.$inferInsert) {
  const [newUser] = await db
    .insert(UserTable)
    .values(data)
    .returning()
    .onConflictDoUpdate({
      target: [UserTable.email],
      set: data,
    });
  if (!newUser) {
    throw new Error("Failed to create user. Please try again later.");
  }
  return newUser;
}

export async function updateUser({
  userId,
  data,
}: {
  userId: string;
  data: Partial<typeof UserTable.$inferInsert>;
}) {
  const [updatedUser] = await db
    .update(UserTable)
    .set(data)
    .where(eq(UserTable.id, userId))
    .returning();
  if (!updatedUser) {
    throw new Error("Failed to update user.");
  }
  return updatedUser;
}

export async function deleteUser(userId: string) {
  const [deletedUser] = await db
    .update(UserTable)
    .set({
      deletedAt: new Date(),
      email: `${userId}-redacted@deleted.com`,
      name: `${userId}-redacted`,
      image: null,
    })
    .where(eq(UserTable.id, userId))
    .returning();
  if (!deletedUser) {
    throw new Error("Failed to delete user.");
  }
  return deletedUser;
}

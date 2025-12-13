import { toast } from "sonner";
import { DrizzleError } from "drizzle-orm";
import type { ActionDataType } from "@/types";

export const getDefaultImage = (name: string) => {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];

  return `https://ui-avatars.com/api/?size=60&background=d1d6dc&color=000&rounded=true&name=${firstName}+${lastName}`;
};

export const extractId = (id: string) => {
  const newId = id.slice(0, 6);
  return newId;
};

export const renderClientError = (error: unknown) => {
  console.log(error);
  let message: string = "An error occurred";
  if (error instanceof DrizzleError) {
    message = "Database Error";
  }
  if (error instanceof Error) {
    message = error.message;
  }
  toast.error(message);
};

export function extractOrJoinName<T extends string | [string, string]>(
  name: T
): T extends string ? [string, string] : string {
  if (Array.isArray(name)) {
    // Input was a tuple → return a string
    return name.join(" ") as any;
  } else {
    // Input was a string → return a tuple
    const [firstName, lastName = ""] = name.split(" ");
    return [firstName, lastName] as any;
  }
}

export function formatPlural(
  count: number,
  { singular, plural }: { singular: string; plural: string },
  { includeCount = true } = {}
) {
  const word = count === 1 ? singular : plural;

  return includeCount ? `${count} ${word}` : word;
}

export function formatPrice(amount: number, { showZeroAsNumber = false } = {}) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  });

  if (amount === 0 && !showZeroAsNumber) return "Free";
  return formatter.format(amount);
}

const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatDate(date: Date) {
  return DATE_FORMATTER.format(date);
}

export function formatNumber(
  number: number,
  options?: Intl.NumberFormatOptions
) {
  const formatter = new Intl.NumberFormat(undefined, options);
  return formatter.format(number);
}

export function actionToast(actionData?: ActionDataType) {
  if (!actionData) return;
  toast[actionData.error ? "error" : "success"](actionData.message);
}

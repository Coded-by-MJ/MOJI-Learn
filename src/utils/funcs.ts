import { toast } from "sonner";
import { DrizzleError } from "drizzle-orm";

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

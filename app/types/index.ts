import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "endDate"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  endDate: string | null;
};

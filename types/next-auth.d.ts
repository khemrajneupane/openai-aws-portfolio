import { IUser } from "@/backend/models/User";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: Omit<IUser, "password"> & DefaultSession["user"];
  }

  interface JWT {
    user?: Omit<IUser, "password">;
  }
}

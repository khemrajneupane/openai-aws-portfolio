// lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/backend/config/dbConnect";
import User, { IUser } from "@/backend/models/User";
import { AuthOptions } from "next-auth";

type Token = {
  user: IUser;
};

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        await dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new Error("Invalid email or password");

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new Error("Invalid email or password");

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const jwtToken = token as Token;

      if (user && user.email) {
        await dbConnect();

        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            password: user.name,
            role: "user",
            createdAt: new Date(),
          });
        }

        jwtToken.user = dbUser;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as IUser;
      //@ts-expect-error: password does not exist on session.user type
      delete session?.user?.password;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

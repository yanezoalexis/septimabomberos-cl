import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Resend } from "resend";

type Role = "ADMIN" | "OFICIAL" | "BOMBERO";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      isActive: boolean;
      image?: string;
    };
  }

  interface User {
    role: Role;
    isActive: boolean;
  }
}

// Demo users para desarrollo
const DEMO_USERS = [
  {
    id: "1",
    email: "admin@7ciabomberos.cl",
    password: "admin123",
    name: "Administrador",
    role: "ADMIN" as Role,
    isActive: true,
  },
  {
    id: "2",
    email: "bombero@7ciabomberos.cl",
    password: "bombero123",
    name: "Bombero Demo",
    role: "BOMBERO" as Role,
    isActive: true,
  },
];

const resend = new Resend(process.env.RESEND_API_KEY);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = DEMO_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          return null;
        }

        if (!user.isActive) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.isActive,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isActive = user.isActive;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.isActive = token.isActive as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email.toLowerCase().trim()))
          .limit(1);

        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image ?? undefined,
          plan: user.plan,
          hasProjetosPacote: user.hasProjetosPacote,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = (user as { plan?: string }).plan ?? "basico";
        token.hasProjetosPacote = (user as { hasProjetosPacote?: boolean }).hasProjetosPacote ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // plano/entitlements vêm do token (definidos no login) — não
        // consultamos o banco a cada navegação pra não deixar toda troca de
        // página lenta. Se o Pack Especialista ou o pacote de projetos for
        // liberado depois da compra, o usuário só precisa sair e entrar de
        // novo pra ver refletido.
        session.user.plan = (token.plan as string) ?? "basico";
        session.user.hasProjetosPacote = (token.hasProjetosPacote as boolean) ?? false;
      }
      return session;
    },
  },
});

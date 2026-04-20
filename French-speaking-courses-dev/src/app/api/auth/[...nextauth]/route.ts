import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';

// Extend the built-in types
declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string | null;
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string | null;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Missing username or password');
        }

        // Check if it's the default admin (for initial setup)
        if (credentials.username === process.env.ADMIN_USERNAME && 
            credentials.password === process.env.ADMIN_PASSWORD) {
          return {
            id: 'default-admin',
            name: 'Administrator',
            email: 'admin@example.com',
            role: 'admin',
          };
        }

        // Find admin in the database
        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username }
        });

        if (!admin) {
          throw new Error('No admin found with this username');
        }

        // Verify password
        const isPasswordValid = await compare(credentials.password, admin.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: admin.id,
          name: admin.username,
          email: null,
          role: 'admin',
        };
      }
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id || '';
        session.user.role = token.role || '';
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: "bwW4hwiAjtoANJdCtJHr9xJF1XzzHnDEnXt/GONgawk=",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

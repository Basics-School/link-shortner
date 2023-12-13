import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "./prisma";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { SignJWT, jwtVerify } from "jose";


const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "rdj@redlnk.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!user) {
            return null;
          }
          if (user.password === null) return null;
          const passwordCorrect = await compare(credentials.password, user.password);
          if (passwordCorrect) return user;
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // async authorized({ request, auth }) {
    //   const url = request.nextUrl
    //   if(request.method === "POST") {
    //     const { authToken } = (await request.json()) ?? {}
    //     console.log("token", {authToken});
    //     // If the request has a valid auth token, it is authorized
    //     const valid = await validateAuthToken(authToken)
    //     if(valid) return true
    //     return NextResponse.json("Invalid auth token", { status: 401 })
    //   }

    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth.user
    // },
    async signIn({ user, account, profile, email, credentials }) {
      if (user) return true;
      return false;
    },
    async session({ session, user, token }) {
      session.role = token.role;
      session.id = token.id;
      session.sessionToken = token.sessionToken;
      return session;
    },
    async redirect({ url, baseUrl = process.env.NEXTAUTH_URL }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if (user) {
          const data = await prisma.session.create({
            data: {
              userId: user.id,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              sessionToken: account.access_token,
            },
          });
          if (data) {
            token.role = user.role;
            token.id = data.id;
            token.sessionToken = account.access_token;
          }
        }
      }

      return token;
    },
  },
  events: {
    async signIn(message) { },
    async signOut(message) {
      // delete sesion from db
      await prisma.session.delete({
        where: { id: message.token.id },
      });
    },
    async createUser(message) {
      /* user created */
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
    },
    async session(message) {
      /* session is active */
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/error",
    verifyRequest: "/verify-request",
    newUser: "/new-user",
  },
};



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // debug: true,
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  jwt: {
    async encode(token, user) {
      try {
        const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
        const alg = "HS256";
        const encoded = await new SignJWT(token)
          .setProtectedHeader({ alg })
          .setExpirationTime("7d")
          .setIssuedAt()
          .setSubject(token)
          .sign(secret);
        return encoded;
      } catch (error) {
        throw error;
      }
    },
    async decode(token) {
      try {
        const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
        const decoded = (await jwtVerify(token.token, secret)).payload;
        return decoded.token;
      } catch (error) {
        throw new Error("Your token is invalid or has expired.");
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  ...authConfig,
});
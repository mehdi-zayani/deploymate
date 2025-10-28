import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

//  Next.js 16 requires not exporting config objects directly.
// Everything must be encapsulated and only the handler is exported.
const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      // Attach GitHub access token to the JWT when user logs in
      if (account) {
        token.accessToken = account.access_token as string;
      }
      return token;
    },

    async session({ session, token }) {
      // Expose the accessToken to the session
      (session as any).accessToken = token.accessToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/", // Redirect users to home page for sign-in
  },
};

// Create the NextAuth handler using the config above
const handler = NextAuth(authOptions);

// Export routes correctly (Next.js 16 style)
export { handler as GET, handler as POST };

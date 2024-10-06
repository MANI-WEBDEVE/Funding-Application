import mongoose from "mongoose";
import NextAuth, { Session, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Users from "@/models/User";
import dbConnect from "@/DB/connectdb";

const nextAuth = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any): Promise<any> {
      try {
        // Check if provider is GitHub
        if (account?.provider === "github") {
          await dbConnect(); // Connect to DB

          // Find user by email
          const existingUser = await Users.findOne({ email: user.email });

          // If user doesn't exist, create new user
          if (!existingUser) {
            await Users.create({
              email: user.email,
              username: user.email?.split("@")[0], // Set username from email
              publicPicture: user.image,
            });
          }

          return true; // Allow sign in
        }
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Deny sign-in if there's an error
      }
    },

    // Session callback
    async session({ session, token }: { session: Session; token: any }): Promise<Session> {
      try {
        await dbConnect(); // Ensure DB is connected

        // Validate session email exists
        if (!session.user?.email) {
          throw new Error("Session does not have an email.");
        }

        // Find user by email
        const dbUser = await Users.findOne({ email: session.user.email });

        if (dbUser) {
          // Attach additional data to session
          (session.user as any).name = dbUser.username; // Set username from DB
          (session.user as any).id = dbUser._id; // Optionally set user ID

          // Optional: Add any other fields you want to persist in the session
          (session as any).user.picture = dbUser.publicPicture; // Example for user's image
        } else {
          throw new Error("User not found in the database.");
        }

        return session; // Return modified session
      } catch (error) {
        console.error("Error in session callback:", error);
        return session; // Return unmodified session in case of error
      }
    },
  },

  // Additional configuration options can go here if needed
});

export { nextAuth as GET, nextAuth as POST };

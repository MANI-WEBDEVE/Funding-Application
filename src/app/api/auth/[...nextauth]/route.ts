import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";

 const nextAuth = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string
      })
  ]
})

export { nextAuth as GET, nextAuth as POST }
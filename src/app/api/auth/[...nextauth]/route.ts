import mongoose from 'mongoose';
import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import User from '@/models/User';
 const nextAuth = NextAuth({
  providers: [
    // OAuth authentication providers
    GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string
      })
  ],
 
 
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "github") {
        const client =  await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("connect to Database⚙")
        const currentUser = await User.findOne({ email: email })
        console.log(currentUser)
        if (!currentUser) {
          const newUser = new User({
            email: user.email,
            username: user.email?.split('@')[0]
          })
          await newUser.save()
          console.log(newUser)
          user.name = newUser.username;
        
        } else {
          user.name = currentUser.username
          
        }

      }
      return true
  },
  // async jwt({ token, user, account, profile, isNewUser }) {
  //   if (user) {
  //     token.id = user.id
  //     token.email = user.email
  //     token.name = user.name
  //   }
  //   console.log(token)
  //   return token
  // },
}

})

export { nextAuth as GET, nextAuth as POST }
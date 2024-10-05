import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useSession, signIn, signOut } from "next-auth/react"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // const {data: session} = useSession()
    // console.log(session)
  const session =  request.cookies.get("next-auth.session-token")
   if (request.nextUrl.pathname.startsWith('/dashboard') && !session) {
     return NextResponse.redirect(new URL('/login', request.url))
   } else if (request.nextUrl.pathname.startsWith('/login') && session) {
     return NextResponse.redirect(new URL('/dashboard', request.url))
   }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard',
}
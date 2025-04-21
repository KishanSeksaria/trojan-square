import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth()

  // If the user is not signed in and is trying to access a protected route, redirect them to the homepage
  if (!isPublicRoute(request) && !userId) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If the user is signed in or is trying to access a public route, allow the request to continue
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
}

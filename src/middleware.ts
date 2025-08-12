import { useUser } from '@clerk/nextjs';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

import { NextResponse } from 'next/server';
import { useContext } from 'react';
import { useSocket } from './context/SocketContext';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);
export default clerkMiddleware(async (auth, req) => {
 
  if (!isPublicRoute(req)) {
    auth().protect()
  }

  
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
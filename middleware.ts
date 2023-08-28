import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Cookies from 'js-cookie'

export function middleware(request: NextRequest) {
  const isSignedIn = Cookies.get('authToken') || null
  if (isSignedIn === null) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/account/:path*',
}

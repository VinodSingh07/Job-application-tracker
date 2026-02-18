//Next.js proxy / Middleware used for route protection
//✅ Protects private pages
//✅ Prevents unauthorized access

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

//If a user tries to open the dashboard without logging in → send them to sign-in page
export default async function proxy(request: NextRequest) {
  const session = await getSession();

  const isSignInPage = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUpPage = request.nextUrl.pathname.startsWith("/sign-up");

  if ((isSignInPage || isSignUpPage) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

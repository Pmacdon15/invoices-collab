import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"; // 💡 Import NextResponse

// Define public routes using an array of standard JavaScript Regular Expressions
const publicRoutes = [
  /^\/sign-in(.*)$/,
  /^\/sign-up(.*)$/,
  /^\/$/, // Matches exactly the root "/"
];

export default clerkMiddleware(async (auth, request) => {
  // 1. Grab the userId from the active session
  const { userId } = await auth();
  const { pathname } = request.nextUrl;

  // 2. If signed in AND attempting to view the root "/", redirect to "/clients"
  if (userId && pathname === "/") {
    const clientsUrl = new URL("/clients", request.url);
    return NextResponse.redirect(clientsUrl);
  }

  // Check if the path matches any of the regex patterns in your array
  const isPublicRoute = publicRoutes.some((pattern) => pattern.test(pathname));

  // 3. Protect all other non-public routes
  if (!isPublicRoute) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

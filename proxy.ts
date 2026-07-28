import { clerkMiddleware } from "@clerk/nextjs/server";

// Define public routes using an array of standard JavaScript Regular Expressions
const publicRoutes = [
  /^\/sign-in(.*)$/,
  /^\/sign-up(.*)$/,
  /^\/$/, // Matches exactly the root "/"
];

export default clerkMiddleware(async (auth, request) => {
  // Get the current path the user is trying to visit
  const { pathname } = request.nextUrl;

  // Check if the path matches any of the regex patterns in your array
  const isPublicRoute = publicRoutes.some((pattern) => pattern.test(pathname));

  if (!isPublicRoute) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

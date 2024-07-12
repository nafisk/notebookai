import { clerkMiddleware } from "@clerk/nextjs/server";

// All routes are public by default
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

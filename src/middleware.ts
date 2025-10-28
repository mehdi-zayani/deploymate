export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"], // protège /dashboard et tout ce qui est dessous
};

import { defineMiddleware } from "astro/middleware";
import { isAuthenticated } from "./apis";
export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
   if (pathname === "/admin/login") {
    return next();
  }
  const token = context.cookies.get("euphuism_admin_session");
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return Response.redirect(
        new URL("/admin/login", context.url),
        302
      );
    }
  }

  return next();
});

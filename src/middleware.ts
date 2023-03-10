import { NextMiddleware, NextResponse } from "next/server";
import { SupportedLocales, getLocale, replaceRouteLocale, getLocaleFromPath, SupportedLocale } from "@/i18n";
import {
  SITE_INTERNAL_HEADER_LOCALE,
  SITE_INTERNAL_HEADER_PATHNAME,
  SITE_INTERNAL_HEADER_URL,
  SITE_LOCALE_COOKIE,
} from "@/configs/constants";

export const middleware: NextMiddleware = (request) => {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = SupportedLocales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  let locale = getLocale(request.headers);

  const cookie = request.cookies.get(SITE_LOCALE_COOKIE)?.value;
  // If there is a cookie, and it is a supported locale, use it
  if (SupportedLocales.includes(cookie as unknown as SupportedLocale)) {
    locale = cookie as unknown as SupportedLocale;
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
  } else if (getLocaleFromPath(pathname) !== locale) {
    return NextResponse.redirect(new URL(replaceRouteLocale(pathname, locale), request.url));
  }

  // ref: https://github.com/vercel/next.js/issues/43704#issuecomment-1411186664
  // for server component to access url and pathname
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(SITE_INTERNAL_HEADER_URL, request.url);
  requestHeaders.set(SITE_INTERNAL_HEADER_PATHNAME, request.nextUrl.pathname);
  requestHeaders.set(SITE_INTERNAL_HEADER_LOCALE, locale);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
};

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|favicon|api).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};

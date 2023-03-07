import { NextMiddleware, NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let locales = ["en-us", "zh-cn"];

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest): string {
  const headers = [...request.headers].reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = "zh-cn";

  return match(languages, locales, defaultLocale).toLowerCase(); // -> 'en-US'
}

export const middleware: NextMiddleware = (request) => {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
  }
};

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // skip all API routes
    "/((?!api).*)",
    // skip favicon
    "/((?!favicon.ico).*)",
    // skip robots.txt
    "/((?!robots.txt).*)",
    // skip sitemap.xml
    "/((?!sitemap.xml).*)",
    // skip manifest.json
    "/((?!manifest.json).*)",
    // skip all static files
    "/((?!static).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};

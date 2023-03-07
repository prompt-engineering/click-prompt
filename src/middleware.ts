import { NextMiddleware, NextResponse } from "next/server";
import { getLocale, getSubdomainByLocale, SupportedLocales, DefaultLocale, type SupportedLocale } from "@/i18n";
import { SITE_DOMAIN, SITE_LOCALE_COOKIE } from "./configs/const";

const middleware: NextMiddleware = async (req) => {
    const headers = req.headers;
    let locale = getLocale(headers);

    // Check if the user has a cookie for the locale
    const cookie = req.cookies.get(SITE_LOCALE_COOKIE);
    if (cookie && SupportedLocales.includes(cookie.value)) {
        locale = cookie.value as SupportedLocale;
    }

    const subdomain = getSubdomainByLocale(locale);

    // don't redirect if we are on localhost
    if (req.nextUrl.hostname === "localhost") {
        return NextResponse.next();
    }

    // redirect to the subdomain if we are on production environment
    if (subdomain.length > 0) {
        return NextResponse.redirect(`https://${subdomain}.${SITE_DOMAIN}${req.nextUrl.pathname}${req.nextUrl.search}`, );
    } else {
        return NextResponse.redirect(`https://www.${SITE_DOMAIN}${req.nextUrl.pathname}${req.nextUrl.search}`);
    }
};

export default middleware;

// export const config = {
//     matcher: [
//         "/.*"
//     ]
// };

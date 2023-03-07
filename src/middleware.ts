import { NextMiddleware, NextResponse } from "next/server";
import { getLocale, getSubdomainByLocale } from "@/i18n";
import { SITE_DOMAIN } from "./configs/const";

const middleware: NextMiddleware = async (req) => {
    const headers = req.headers;
    const locale = getLocale(headers);
    const subdomain = getSubdomainByLocale(locale);
    console.log("subdomain", subdomain);
    console.log("locale", locale);

    if (subdomain.length > 0) {
        NextResponse.redirect(`https://${subdomain}.${SITE_DOMAIN}${req.nextUrl.pathname}${req.nextUrl.search}`);
    } else {
        NextResponse.redirect(`https://www.${SITE_DOMAIN}${req.nextUrl.pathname}${req.nextUrl.search}`);
    }
};

export default middleware;

// export const config = {
//     matcher: [
//         "/.*"
//     ]
// };

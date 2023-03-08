import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const dictionaries = {
  "en-US": () => import("./en-US").then((module) => module.default),
  "zh-CN": () => import("./zh-CN").then((module) => module.default),
};

export type SupportedLocale = keyof typeof dictionaries;
export const SupportedLocales = Object.keys(dictionaries) as SupportedLocale[];
export const DefaultLocale: SupportedLocale = "zh-CN";

export function stripLocaleInPath(pathname: string): string {
  const locale = pathname.split("/")[1];
  if (SupportedLocales.includes(locale as SupportedLocale)) {
    return pathname.replace(`/${locale}`, "");
  }
  return pathname;
}

export function getLocaleFromPath(pathname: string): SupportedLocale {
  const locale = pathname.split("/")[1];
  if (SupportedLocales.includes(locale as SupportedLocale)) {
    return locale as SupportedLocale;
  }

  return DefaultLocale;
}

export function replaceRouteLocale(pathname: string, locale: SupportedLocale): string {
  const currentLocale = pathname.split("/")[1];
  if (SupportedLocales.includes(currentLocale as SupportedLocale)) {
    return pathname.replace(`/${currentLocale}`, `/${locale}`);
  }

  return `/${locale}${pathname}`;
}

export function getLocale(headers: Headers): SupportedLocale {
  let languages = new Negotiator({
    headers: [...headers].reduce((pre, [key, value]) => {
      // @ts-ignore
      pre[key] = value;
      return pre;
    }, {}),
  }).languages();

  let locale: SupportedLocale;
  try {
    locale = match(languages, SupportedLocales, DefaultLocale) as SupportedLocale;
  } catch (error) {
    locale = DefaultLocale;
  }

  return locale;
}

import type { GlobalKey as GlobalKeyEnUS, PageKey as PageKeyEnUS } from "./en-US";
import type { GlobalKey as GlobalKeyZhCN, PageKey as PageKeyZhCN } from "./zh-CN";

export type AppData = {
  i18n: {
    g: (key: GlobalKeyEnUS | GlobalKeyZhCN) => string;
    tFactory: <P extends PagePath>(path: P) => (key: PageKeyEnUS<P> | PageKeyZhCN<P>) => string;
  };
  pathname: string;
  locale: SupportedLocale;
};
export type AppDataI18n = AppData["i18n"];
import { SITE_INTERNAL_HEADER_LOCALE, SITE_INTERNAL_HEADER_PATHNAME } from "@/configs/constants";
import { PagePath } from "./pagePath";
export async function getAppData(): Promise<AppData> {
  let pathname: PagePath = "/";
  let locale = DefaultLocale;

  try {
    const { headers } = await import("next/headers");
    pathname = (headers().get(SITE_INTERNAL_HEADER_PATHNAME) || "/") as PagePath;
    locale = headers().get(SITE_INTERNAL_HEADER_LOCALE) as SupportedLocale;
  } catch (error) {
    console.log(error);
  }

  const dictionary = dictionaries[locale] ?? dictionaries[DefaultLocale];
  return dictionary().then((module) => ({
    i18n: {
      g: (key) => module["*"][key],
      tFactory: (key) => (module[pathname] as any)[key as any] as any,
    },
    pathname: stripLocaleInPath(pathname),
    locale,
  }));
}

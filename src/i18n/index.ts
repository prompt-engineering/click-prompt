import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const dictionaries = {
  "en-US": () => import("./en-US.json").then((module) => module.default),
  "zh-CN": () => import("./zh-CN.json").then((module) => module.default),
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

export async function getDictionary(
  locale: SupportedLocale,
  pathname: string = "/",
): Promise<{ all: any; currentPage: any }> {
  const dictionary = dictionaries[locale] ?? dictionaries[DefaultLocale];
  return dictionary().then((module) => ({
    all: module,
    // @ts-ignore
    currentPage: module[stripLocaleInPath(pathname)],
  }));
}

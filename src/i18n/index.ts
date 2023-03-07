import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const dictionaries = {
  "en-US": () => import("./en-US.json").then((module) => module.default),
  "zh-CN": () => import("./zh-CN.json").then((module) => module.default),
};

export type SupportedLocale = keyof typeof dictionaries;
export const SupportedLocales = ["en-US", "zh-CN"]
export function getSubdomainByLocale(locale: SupportedLocale) {
  switch (locale) {
    case "en-US":
      return "en";
    case "zh-CN":
      return "";
    default:
      return "";
  }
}
export function getLocaleBySubdomain(subdomain: string) {
  switch (subdomain) {
    case "en":
      return "en-US";
    case "":
      return "zh-CN";
    default:
      return "zh-CN";
  }
}
export function getLocale(headers: Headers) {
  let languages = new Negotiator({
    headers: [...headers].reduce((pre, [key, value]) => {
      // @ts-ignore
      pre[key] = value;
      return pre;
    }, {}),
  }).languages();

  let defaultLocale: SupportedLocale = "zh-CN";
  let locale: SupportedLocale;

  try {
    locale = match(languages, SupportedLocales, defaultLocale) as SupportedLocale;
  } catch (error) {
    locale = defaultLocale;
  }

  return locale;
}

export async function getDictionary(headers: Headers, pathname: string = "/"): Promise<{ all: any; currentPage: any }> {
  const locale = getLocale(headers);

  let dictionary = dictionaries[locale];
  return dictionary().then((module) => ({
    all: module,
    // @ts-ignore
    currentPage: module[pathname],
  }));
}

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const dictionaries = {
  "en-US": () => import("./en-us.json").then((module) => module.default),
  "zh-CN": () => import("./zh-cn.json").then((module) => module.default),
};

export type SupportedLocale = keyof typeof dictionaries;

function normalizePathname(pathname: string) {
  const segments = pathname.split("/");

  if (segments.length === 2) {
    return "/";
  } else if (segments.length === 3) {
    return `/${segments[2]}`;
  }

  return segments.slice(2).join("/");
}

export async function getDictionary(headers: Headers, pathname: string = "/"): Promise<{ all: any; currentPage: any }> {
  let locales = ["en-US", "zh-CN"];

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
    locale = match(languages, locales, defaultLocale) as SupportedLocale;
  } catch (error) {
    locale = defaultLocale;
  }

  let dictionary = dictionaries[locale];
  return dictionary().then((module) => ({
    all: module,
    // @ts-ignore
    currentPage: module[normalizePathname(pathname)],
  }));
}

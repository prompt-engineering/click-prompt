const dictionaries = {
  "en-US": () => import("./en-US.json").then((module) => module.default),
  "zh-CN": () => import("./zh-CN.json").then((module) => module.default),
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

export async function getDictionary(
  locale: SupportedLocale,
  pathname: string = "/",
): Promise<{ all: any; currentPage: any }> {
  let dictionary = dictionaries[locale];
  if (!dictionary) {
    dictionary = dictionaries["en-US"];
  }
  return dictionary().then((module) => ({
    all: module,
    // @ts-ignore
    currentPage: module[normalizePathname(pathname)],
  }));
}

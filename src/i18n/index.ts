const dictionaries = {
  "en-us": () => import("./en-us.json").then((module) => module.default),
  "zh-cn": () => import("./zh-cn.json").then((module) => module.default),
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
    dictionary = dictionaries["en-us"];
  }
  return dictionary().then((module) => ({
    all: module,
    // @ts-ignore
    currentPage: module[normalizePathname(pathname)],
  }));
}

import "server-only";

import ChatGptPromptList from "./page.client";
import { SupportedLocale, getAppData } from "@/i18n";

async function prepareData(locale: SupportedLocale) {
  return import(`@/assets/resources/prompts_${locale}.json`).then((mod) => mod.default);
}

export default async function ChatGptPromptRolePlay() {
  const { locale, pathname, i18n } = await getAppData();
  const i18nProps: GeneralI18nProps = {
    locale,
    pathname,
    i18n: {
      dict: i18n.dict,
    },
  };
  const prompts = await prepareData(locale);

  return <ChatGptPromptList prompts={prompts} {...i18nProps} />;
}

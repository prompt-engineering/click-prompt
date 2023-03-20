import "server-only";

import ChatGptGeneral from "./page.client";
import { getAppData, SupportedLocale } from "@/i18n";

async function prepareData(locale: SupportedLocale) {
  return import(`@/assets/resources/chatgpt-specific_${locale}.json`).then((mod) => mod.default);
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
  const chatgptSpecific = await prepareData(locale);

  return <ChatGptGeneral chatgptSpecific={chatgptSpecific} {...i18nProps} />;
}

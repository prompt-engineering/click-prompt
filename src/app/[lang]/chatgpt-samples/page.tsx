import "server-only";

import ChatGptSamples from "./page.client";
import { getAppData } from "@/i18n";

export default async function ChatGptPromptRolePlay() {
  const { locale, pathname, i18n } = await getAppData();
  const i18nProps: GeneralI18nProps = {
    locale,
    pathname,
    i18n: {
      dict: i18n.dict,
    },
  };

  return <ChatGptSamples {...i18nProps} />;
}

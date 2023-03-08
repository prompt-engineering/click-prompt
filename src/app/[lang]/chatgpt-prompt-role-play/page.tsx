import "server-only";

import ChatGptPromptList from "./page.client";
import { SupportedLocale, getAppData } from "@/i18n";

async function prepareData(locale: SupportedLocale) {
  return import(`@/assets/resources/prompts_${locale}.json`).then((mod) => mod.default);
}

export default async function ChatGptPromptRolePlay() {
  const { locale } = await getAppData();
  const prompts = await prepareData(locale);

  return <ChatGptPromptList prompts={prompts} />;
}

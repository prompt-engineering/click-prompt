import "server-only";

import ChatGptPromptList from "./page.client";
import { headers } from "next/headers";
import { SupportedLocale, DefaultLocale } from "@/i18n";
import { SITE_INTERNAL_HEADER_LOCALE } from "@/configs/constants";

async function prepareData(locale: SupportedLocale) {
  return import(`@/assets/resources/prompts_${locale}.json`).then((mod) => mod.default);
}

export default async function ChatGptPromptRolePlay() {
  const locale: SupportedLocale = (headers().get(SITE_INTERNAL_HEADER_LOCALE) || DefaultLocale) as SupportedLocale;
  const prompts = await prepareData(locale);

  return <ChatGptPromptList prompts={prompts} />;
}

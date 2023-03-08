import ChatGptPromptList from "./page.client";
import {SupportedLocale, SupportedLocales} from "@/i18n";


export async function generateStaticParams() {
  return SupportedLocales.map((lang) => ({
    lang,
    prompts: import(`@/assets/resources/prompts_${lang}.json`).then((mod) => mod.default),
  }));
}

export default function ChatGptPromptRolePlay({params}: { params: { lang: SupportedLocale, prompts: any }}) {
  return <ChatGptPromptList locale={params.lang} prompts={params.prompts} />
}

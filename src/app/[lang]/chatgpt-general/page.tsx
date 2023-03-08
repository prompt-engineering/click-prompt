import "server-only";

import ChatGptGeneral from "./page.client";
import { getAppData } from "@/i18n";

export default async function ChatGptPromptRolePlay() {
  const appData = await getAppData();

  return <ChatGptGeneral {...appData} />;
}

import "server-only";

import ReadingList from "./page.client";
import { getAppData } from "@/i18n";

export default async function ChatGptPromptRolePlay() {
  const appData = await getAppData();

  return <ReadingList {...appData} />;
}

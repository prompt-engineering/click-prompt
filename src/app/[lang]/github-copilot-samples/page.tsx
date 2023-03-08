import "server-only";

import GitHubCopilotSamples from "./page.client";
import { getAppData } from "@/i18n";

export default async function ChatGptPromptRolePlay() {
  const appData = await getAppData();

  return <GitHubCopilotSamples {...appData} />;
}

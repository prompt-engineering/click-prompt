import "server-only";

import StableDiffusionGenerator from "./page.client";
import { getAppData } from "@/i18n";

export default async function StableDiffusionGeneratorRSC() {
  const appData = await getAppData();

  return <StableDiffusionGenerator {...appData} />;
}

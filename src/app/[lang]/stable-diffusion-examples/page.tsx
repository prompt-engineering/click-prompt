import "server-only";

import StableDiffusionExamples from "./stableDiffusionExamples";
import { getAppData } from "@/i18n";

export default async function PageClient() {
  const appData = await getAppData();

  return <StableDiffusionExamples {...appData} />;
}

import "server-only";

import StableDiffusionDeepDanbooru from "./page.client";
import { getAppData } from "@/i18n";

export default async function PageClient() {
  const { locale, pathname, i18n } = await getAppData();
  const i18nProps: GeneralI18nProps = {
    locale,
    pathname,
    i18n: {
      dict: i18n.dict,
    },
  };

  return <StableDiffusionDeepDanbooru {...i18nProps} />;
}

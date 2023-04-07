import React from "react";
import { getAppData } from "@/i18n";
import { HomeClient } from "@/app/[lang]/page.client";

async function Page() {
  const { i18n } = await getAppData();

  return <HomeClient dict={i18n.dict} />;
}

export default Page;

"use client";

import { SITE_LOCALE_COOKIE } from "@/configs/constants";

export default function LocaleSwitcher({ locale }: { locale: string }) {
  const classZh = locale === "zh-CN" ? "text-blue-500" : "text-gray-500";
  const classEn = locale === "en-US" ? "text-blue-500" : "text-gray-500";

  function setEn() {
    document.cookie = `${SITE_LOCALE_COOKIE}=en-US;path=/;max-age=31536000;`;
    window.location.reload();
  }

  function setZh() {
    document.cookie = `${SITE_LOCALE_COOKIE}=zh-CN;path=/;max-age=31536000;`;
    window.location.reload();
  }

  return (
    <div className='mx-4 w-16 flex justify-around select-none'>
      <span className={`cursor-pointer ${classZh}`} onClick={setZh}>
        中
      </span>
      <span>/</span>
      <span className={`cursor-pointer ${classEn}`} onClick={setEn}>
        EN
      </span>
    </div>
  );
}

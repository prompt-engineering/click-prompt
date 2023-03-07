"use client";

import { useRouter } from "next/navigation";
import { SITE_LOCALE_COOKIE } from "@/configs/const";

export default function LocaleSwitcher({ locale }: { locale: string }) {
  const classZh = locale === "zh-CN" ? "text-blue-500" : "text-gray-500";
  const classEn = locale === "en-US" ? "text-blue-500" : "text-gray-500";
  const router = useRouter();

  function setEn() {
    fetch("/api/set-cookie", {
      method: "POST",
      body: "en-US",
    }).then(() => {
      router.refresh();
    });
  }

  function setZh() {
    fetch("/api/set-cookie", {
      method: "POST",
      body: "zh-CN",
    }).then(() => {
      router.refresh();
    });
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

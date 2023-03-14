"use client";

import { SITE_LOCALE_COOKIE } from "@/configs/constants";
import { Box, Menu, MenuButton, MenuList, MenuItem } from "@/components/ChakraUI";
import { ChevronDownIcon } from "@/components/ChakraUI/icons";

const options = [
  {
    value: "zh-CN",
    label: "中文",
  },
  {
    value: "en-US",
    label: "English",
  },
];
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
    <div className=' flex justify-around select-none'>
      <Menu>
        <MenuButton mr={4}>
          {locale === "zh-CN" ? "中文" : "English"}
          <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          {options.map((child) => (
            <MenuItem
              _focus={{ bg: "gray.100" }}
              key={child.value}
              onClick={() => (child.value === "zh-CN" ? setZh() : setEn())}
            >
              <Box mr={4} className={`cursor-pointer ${classZh}`} color={child.value === locale ? "#108EE9" : "black"}>
                {child.label}
              </Box>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}

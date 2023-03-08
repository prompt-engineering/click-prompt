import React from "react";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link as NavLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@/components/ChakraUI";
import { ChevronDownIcon, ExternalLinkIcon, HamburgerIcon } from "@/components/ChakraUI/icons";
import Link from "next/link";
import { headers } from "next/headers";
import { ClickPromptIcon } from "@/components/CustomIcon";
import { GITHUB_URL, SITE_INTERNAL_HEADER_PATHNAME } from "@/configs/constants";
import LocaleSwitcher from "@/components/LocaleSwtcher";
import { getDictionary, stripLocaleInPath, SupportedLocale } from "@/i18n";

export default async function NavBar({ locale }: { locale: string }) {
  const pathname = stripLocaleInPath(headers().get(SITE_INTERNAL_HEADER_PATHNAME) || "");
  const dict = await getDictionary(locale as SupportedLocale);
  const all = dict.all;

  const NavList = [
    {
      title: "ChatGPT",
      children: [
        { url: `/chatgpt-general/`, title: all["navbar"]["chatgpt-general"] },
        { url: `/chatgpt-prompt-role-play/`, title: all["navbar"]["chatgpt-prompt-role-play"] },
        { url: `/chatgpt-generator-cot/`, title: all["navbar"]["chatgpt-generator-cot"] },
        { url: `/chatgpt-interactive-game/`, title: all["navbar"]["chatgpt-interactive-game"] },
        { url: `/chatgpt-samples/`, title: all["navbar"]["chatgpt-samples"] },
        { url: `/chatgpt/`, title: all["navbar"]["chatgpt"] },
      ],
    },
    {
      title: "StableDiffusion",
      children: [{ url: `/stable-diffusion-examples/`, title: all["navbar"]["stable-diffusion-examples"] }],
    },
    { url: `/stable-diffusion-generator/`, title: all["navbar"]["stable-diffusion-generator"] },
    {
      title: "GitHub Copilot",
      children: [{ url: `/github-copilot-samples/`, title: all["navbar"]["github-copilot-samples"] }],
    },
    { title: "Resources", children: [{ url: `/resources/`, title: all["navbar"]["resources"] }] },
  ];

  return (
    <Flex align='center' py='4' pl='20px' pr={{ md: "20px", base: "4px" }} boxShadow='base'>
      <Flex>
        <Heading size='md' mr={4}>
          <Link href={"/"}>
            <ClickPromptIcon /> ClickPrompt
          </Link>
        </Heading>
        <Flex align='center' display={{ md: "flex", base: "none" }}>
          {NavList.map((nav) => {
            // 如果当前导航项有子菜单，则呈现为下拉菜单
            if (nav.children) {
              return (
                <Menu key={nav.title}>
                  <MenuButton mr={4}>
                    {nav.title}
                    <ChevronDownIcon />
                  </MenuButton>
                  <MenuList>
                    {nav.children.map((child) => (
                      <MenuItem key={child.url} as={Link} href={child.url}>
                        <Box mr={4} color={pathname === child.url ? "#108EE9" : "black"}>
                          {child.title}
                        </Box>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              );
            } else {
              // 否则呈现为单独的链接
              return (
                <Link key={nav.url} href={nav.url}>
                  <Box mr={4} color={pathname === nav.url ? "#108EE9" : "black"}>
                    {nav.title}
                  </Box>
                </Link>
              );
            }
          })}
        </Flex>
      </Flex>
      <Spacer />
      <LocaleSwitcher locale={locale} />
      <NavLink display={{ md: "block", base: "none" }} href={GITHUB_URL} isExternal>
        GitHub <ExternalLinkIcon mx='2px' />
      </NavLink>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
          display={{ md: "none", base: "block" }}
          mr={4}
        />
        <MenuList display={{ md: "none", base: "block" }}>
          {NavList.map((nav) =>
            nav.children ? (
              nav.children.map((child) => (
                <MenuItem key={child.url} as={Link} href={child.url}>
                  <Box mr={4} color={pathname === child.url ? "#108EE9" : "black"}>
                    {child.title}
                  </Box>
                </MenuItem>
              ))
            ) : (
              <MenuItem as={Link} href={nav.url} key={nav.url}>
                <Box mr={4} color={pathname === nav.url ? "#108EE9" : "black"}>
                  {nav.title}
                </Box>
              </MenuItem>
            ),
          )}
          <MenuItem>
            <NavLink href={GITHUB_URL} isExternal>
              GitHub <ExternalLinkIcon mx='2px' />
            </NavLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

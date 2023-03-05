import React from "react";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  Link as NavLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  const NavList = [
    {
      url: "/chatgpt-general",
      title: "ChatGPT 常用指令",
    },
    {
      url: "/chatgpt-prompt-role-play",
      title: "ChatGPT 角色扮演",
    },
    {
      url: "/chatgpt-generator-cot",
      title: "ChatGPT 游戏模式",
    },
    {
      url: "/stable-diffusion-generator",
      title: "AI 绘画生成器",
    },
    {
      url: "/chatgpt-samples",
      title: "ChatGPT 示例",
    },
    {
      url: "/stable-diffusion-examples",
      title: "StableDiffusion 示例",
    },
    {
      url: "/github-copilot-samples",
      title: "GitHub Copilot 示例",
    },
    {
      url: "/resources",
      title: "学习资料",
    },
  ];

  return (
    <Flex align='center' py='4' pl='20px' pr={{ md: "20px", base: "4px" }} boxShadow='base'>
      <Flex>
        <Heading size='md' mr={4}>
          <Link href={"/"}>PromptGenerator</Link>
        </Heading>
        <Flex display={{ md: "flex", base: "none" }}>
          {NavList.map((nav) => (
            <Link key={nav.url} href={nav.url}>
              <Box mr={4} color={router.asPath === nav.url ? "#108EE9" : "black"}>
                {nav.title}
              </Box>
            </Link>
          ))}
        </Flex>
      </Flex>
      <Spacer />
      <NavLink display={{ md: "block", base: "none" }} href='https://github.com/phodal/prompt-generator' isExternal>
        GitHub <ExternalLinkIcon mx='2px' />
      </NavLink>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
          display={{ md: "none", base: "block" }}
        />
        <MenuList display={{ md: "none", base: "block" }}>
          {NavList.map((nav) => (
            <MenuItem key={nav.url}>
              <Link href={nav.url}>
                <Box mr={4} color={router.asPath === nav.url ? "#108EE9" : "black"}>
                  {nav.title}
                </Box>
              </Link>
            </MenuItem>
          ))}
          <MenuItem>
            <NavLink href='https://github.com/phodal/prompt-generator' isExternal>
              GitHub <ExternalLinkIcon mx='2px' />
            </NavLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

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
  Button,
} from "@chakra-ui/react";
import { ExternalLinkIcon, HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  const NavList = [
    {
      title: "ChatGPT",
      children: [
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
          url: "/chatgpt-samples",
          title: "ChatGPT 示例",
        },
      ],
    },
    {
      title: "StableDiffusion",
      children: [
        {
          url: "/stable-diffusion-generator",
          title: "AI 绘画生成器",
        },
        {
          url: "/stable-diffusion-examples",
          title: "StableDiffusion 示例",
        },
      ],
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
                        <Box mr={4} color={router.asPath === child.url ? "#108EE9" : "black"}>
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
                  <Box mr={4} color={router.asPath === nav.url ? "#108EE9" : "black"}>
                    {nav.title}
                  </Box>
                </Link>
              );
            }
          })}
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
          {NavList.map((nav) =>
            nav.children ? (
              nav.children.map((child) => (
                <MenuItem key={child.url} as={Link} href={child.url}>
                  <Box mr={4} color={router.asPath === child.url ? "#108EE9" : "black"}>
                    {child.title}
                  </Box>
                </MenuItem>
              ))
            ) : (
              <MenuItem as={Link} href={nav.url} key={nav.url}>
                <Box mr={4} color={router.asPath === nav.url ? "#108EE9" : "black"}>
                  {nav.title}
                </Box>
              </MenuItem>
            ),
          )}
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

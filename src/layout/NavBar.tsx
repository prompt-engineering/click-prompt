import React from "react";
import { Flex, Spacer, Box, Heading, Link as NavLink } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
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
    <Flex py='4' pl='20' pr='20' boxShadow='base'>
      <Flex>
        <Heading size='md' mr={4}>
          <Link href={"/"}>ClickPrompt</Link>
        </Heading>
        {NavList.map((nav) => (
          <Link key={nav.url} href={nav.url}>
            <Box mr={4} color={router.asPath === nav.url ? "#108EE9" : "black"}>
              {nav.title}
            </Box>
          </Link>
        ))}
      </Flex>
      <Spacer />
      <NavLink href='https://github.com/phodal/prompt-generator' isExternal>
        GitHub <ExternalLinkIcon mx='2px' />
      </NavLink>
    </Flex>
  );
}

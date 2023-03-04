import React from "react";
import { Flex, Spacer, Box, Heading, Link as NavLink } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  const NavList = [
    {
      url: "/ChatGptGeneral",
      title: "类 ChatGPT 常用指令",
    },
    {
      url: "/ChatGptPromptList",
      title: "类 ChatGPT 角色扮演",
    },
    {
      url: "/StableDiffusionGenerator",
      title: "AI 绘画生成器",
    },
    {
      url: "/ChatGptCotGenerator",
      title: "类 ChatGPT 游戏模式",
    },
    {
      url: "/ReadingList",
      title: "学习资料",
    },
  ];

  return (
    <Flex py='4' pl='20' pr='20' boxShadow='base'>
      <Flex>
        <Heading size='md' mr={4}>
          Prompt Generator
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

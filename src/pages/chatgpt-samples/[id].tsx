import type { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ExternalLinkIcon, QuestionIcon } from "@chakra-ui/icons";
import CopyComponent from "@/components/CopyComponent";
import SimpleMarkdown from "@/components/SimpleMarkdown";
import ChatGptIcon from "@/components/Logo/ChatGPTIcon";

export const getStaticPaths: GetStaticPaths = async () => {
  const index = await import("@/assets/chatgpt/samples/index.json").then((mod) => mod.default);
  const paths = index.map((item) => item.path);

  return {
    paths: paths.map((it) => ({ params: { id: it.split(".").slice(0, -1).join(".") } })),
    fallback: true,
  };
};

interface Sample {
  name: string;
  description: string;
  category: string;
  author: string;
  homepage: string;
  preview: string;
  steps: {
    ask: string;
    response: string;
  }[];
}

interface Props {
  content: Sample;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params === undefined) {
    return {
      props: {},
    };
  }

  const { id } = params;
  const content: Sample = await import(`@/assets/chatgpt/samples/${id}.yml`).then((mod) => mod.default);
  return { props: { content } };
};

export default function Sample({ content }: Props) {
  return (
    <>
      {content && (
        <>
          <Heading as='h3'>
            {content.name} by &nbsp;
            <Link href={content.homepage} isExternal>
              {content.author} <ExternalLinkIcon />
            </Link>
          </Heading>
          <Spacer />
          <Box>
            {content.steps.map((step, index) => (
              <>
                <HumanBlock gap={2}>
                  <Box>
                    <QuestionIcon w='26px' height='26px' />
                    <StyledCopyComponent value={step.ask} />
                  </Box>
                  <Box>
                    <SimpleMarkdown content={step.ask?.replaceAll("\n", "\n\n")} />
                  </Box>
                </HumanBlock>
                <AiBlock>
                  <Box>
                    <ChatGptIcon />
                  </Box>
                  <Box>
                    <SimpleMarkdown content={step.response?.replaceAll("\n", "\n\n")} />
                  </Box>
                </AiBlock>
              </>
            ))}
          </Box>
        </>
      )}
    </>
  );
}

const StyledCopyComponent = styled(CopyComponent)`
  margin-top: 1rem;
`;

const HumanBlock = styled(Flex)`
  background-color: rgba(247, 247, 248);
  border-color: rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const AiBlock = styled(Flex)`
  background-color: #fff;
  padding: 1rem;
`;

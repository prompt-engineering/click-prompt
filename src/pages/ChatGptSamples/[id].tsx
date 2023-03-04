import type { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Link,
  Spacer,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import CopyComponent from "@/components/CopyComponent";
import SimpleMarkdown from "@/components/SimpleMarkdown";

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
          <Accordion allowMultiple index={content.steps.map((_, index) => index)}>
            {content.steps.map((step, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton _expanded={{ bg: "tomato", color: "white" }}>
                    <Box flex='1' textAlign='left'>
                      <h3>Question {index}</h3>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Heading size='md'>Human</Heading>
                  <HumanBlock>
                    <SimpleMarkdown content={step.ask?.replaceAll("\n", "\n\n")} />
                    <CopyComponent value={step.ask} />
                  </HumanBlock>
                  <AiBlock>
                    <Heading size='md'>AI</Heading>
                    <SimpleMarkdown content={step.response?.replaceAll("\n", "\n\n")} />
                  </AiBlock>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </>
  );
}

const HumanBlock = styled.div`
  background-color: rgba(247, 247, 248);
  border-color: rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const AiBlock = styled.div`
  background-color: #fff;
  padding: 1rem;

  p {
    margin: 0;
    line-height: 1.5;
  }

  .empty-language {
    float: left;
    width: 100%;
    padding: 0.5rem;
  }
`;

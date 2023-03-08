"use client";

import React from "react";
import { Alert, AlertIcon, AlertTitle, Box, Card, CardBody, CardHeader, Heading, Link, Stack } from "@chakra-ui/react";
import samples from "@/assets/github-copilot/samples/index.json";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import SimpleMarkdown from "@/components/SimpleMarkdown";
import { CP_GITHUB_ASSETS } from "@/configs/constants";
import CopyComponent from "@/components/CopyComponent";

type Snippet = {
  name: string;
  prompt: string;
  result: string;
};

type GitHubCopilotSample = {
  name: string;
  author: string;
  category: string;
  homepage: string;
  snippets: Snippet[];
  path: string;
};

function GitHubCopilotSamples() {
  function SnippetCode(index: number, sample: GitHubCopilotSample, snippet: Snippet) {
    return (
      <Card
        mt={4}
        boxShadow='md'
        maxHeight='600px'
        overflow='auto'
        key={`SnippetCode-${index}`}
        sx={{ breakInside: "avoid-column" }}
      >
        <CardHeader>
          <Heading size='md'>
            {snippet.name} -{" "}
            <Link href={sample.homepage} isExternal>
              {sample.author} <ExternalLinkIcon />
            </Link>
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack>
            <Stack spacing={8} direction='row' justify='space-between'>
              <Heading size={"md"}>Prompt</Heading>
              <CopyComponent value={snippet.prompt} boxSize={6} />
            </Stack>
            <SimpleMarkdown content={snippet.prompt} />
            <Heading size={"md"}>Result</Heading>
            <SimpleMarkdown content={snippet.result} />
          </Stack>
        </CardBody>
      </Card>
    );
  }

  let githubCopilotLink = `${CP_GITHUB_ASSETS}/github-copilot/samples`;
  return (
    <div>
      <Alert status='info'>
        <AlertIcon />
        <AlertTitle>分享我的 GitHub Copilot 心得：</AlertTitle>
        <Link href={githubCopilotLink} isExternal>
          Pull Request <ExternalLinkIcon />
        </Link>
      </Alert>
      {samples.length > 0 && (
        <Box w='100%' maxW='1600px' mx='auto' sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}>
          {samples.map((sample) => sample.snippets.map((artist, index) => SnippetCode(index, sample, artist)))}
        </Box>
      )}
    </div>
  );
}

export default GitHubCopilotSamples;

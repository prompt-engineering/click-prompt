import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Box, Card, CardBody, CardHeader, Heading, Link, Stack } from "@chakra-ui/react";
import samples from "@/assets/github-copilot/samples/index.json";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import SimpleMarkdown from "@/components/SimpleMarkdown";

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
      <Card>
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
            <Heading size={"md"}>Prompt</Heading>
            <SimpleMarkdown content={snippet.prompt} />
            <Heading size={"md"}>Result</Heading>
            <SimpleMarkdown content={snippet.result} />
          </Stack>
        </CardBody>
      </Card>
    );
  }

  return (
    <div>
      {samples.length > 0 && (
        <Box padding={4} w='100%' maxW='1200px' mx='auto'>
          {samples.map((sample) => sample.snippets.map((artist, index) => SnippetCode(index, sample, artist)))}
        </Box>
      )}
    </div>
  );
}

export default GitHubCopilotSamples;

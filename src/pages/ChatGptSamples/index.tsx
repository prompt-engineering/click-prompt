import React from "react";
import { Card, CardFooter, CardHeader } from "@chakra-ui/card";
import { Button, CardBody, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

type SampleStep = {
  ask: string;
  response: string;
};

type Sample = {
  name: string;
  author: string;
  path: string;
  preview?: string;
  steps: SampleStep[];
};

function ChatGptSamples(props: any) {
  // 1. fetch Samples from data/chatgpt/templates/index.json
  // 2. render Samples to DataTable
  // 3. add route for Sample
  const [samples, setSamples] = React.useState<Sample[]>([]);
  React.useEffect(() => {
    fetch("/data/chatgpt/samples/index.json")
      .then((response) => response.json())
      .then((json) => {
        setSamples(json);
      });
  });

  return (
    <>
      {samples.length > 0 && (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
          {samples.map((sample, index) => (
            <Card key={`sample-${index}`}>
              <CardHeader>
                <Heading size='md'>
                  {sample.name} - {sample.author}
                </Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  <ReactMarkdown>{sample?.preview ? sample.preview : "no preview"}</ReactMarkdown>
                </Stack>
              </CardBody>

              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default ChatGptSamples;

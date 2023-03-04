import React from "react";

import { CardBody, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { Card, CardHeader } from "@chakra-ui/card";
import Image from "next/image";

import CopyComponent from "@/components/CopyComponent";
import samples from "@/assets/stable-diffusion/samples/index.json";

function Index() {
  return (
    <>
      {samples.length > 0 && (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(260px, 1fr))'>
          {samples.map((sample, index) => (
            <div key={"index-" + index}>
              {sample.artists.map((artist, index) => (
                <Card key={`sample-${index}`}>
                  <CardHeader>
                    <Heading size='md'>
                      {sample.name} - {sample.author}
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack>
                      <Image src={artist.preview} alt='' width={256} height={256} />
                      <CopyComponent value={artist.prompt} />
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </div>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default Index;

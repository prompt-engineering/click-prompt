import React from "react";

import { CardBody, Heading, SimpleGrid, Stack, Link } from "@chakra-ui/react";
import { Card, CardHeader } from "@chakra-ui/card";
import Image from "next/image";

import CopyComponent from "@/components/CopyComponent";
import samples from "@/assets/stable-diffusion/samples/index.json";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function Index() {
  return (
    <>
      {samples.length > 0 && (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(320px, 1fr))'>
          {samples.map((sample, index) => (
            <div key={"index-" + index}>
              {sample.artists.map((artist, index) => (
                <Card key={`sample-${index}`}>
                  <CardHeader>
                    <Heading size='md'>
                      {sample.name} -{" "}
                      <Link href={sample.homepage} isExternal>
                        {sample.author} <ExternalLinkIcon />
                      </Link>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack>
                      <Image src={artist.preview} alt='' width={512} height={512} />
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

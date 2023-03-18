"use client";

import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Link as NavLink,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import samples from "@/assets/chatgpt/flow/index.json";
import SimpleMarkdown from "@/components/markdown/SimpleMarkdown";
import Link from "next/link";
import { CP_GITHUB_ASSETS } from "@/configs/constants";

function StartlingByEachStepList({ i18n }: GeneralI18nProps) {
  const chatgptLink = `${CP_GITHUB_ASSETS}/chatgpt`;
  const dict = i18n.dict;

  return (
    <>
      <Alert status='info'>
        <AlertIcon />
        <AlertTitle>{dict["create-new-steps"]}: </AlertTitle>
        <NavLink href={chatgptLink} isExternal>
          Pull Request <ExternalLinkIcon />
        </NavLink>
      </Alert>
      {samples.length > 0 && (
        <SimpleGrid columns={{ md: 4 }} spacing={4}>
          {samples.map((sample, index) => (
            <Card key={`sample-${index}`}>
              <CardHeader>
                <Heading size='md'>{sample.name}</Heading>
                <Text>{sample.author}</Text>
              </CardHeader>

              <CardBody maxH='320px' overflow='auto'>
                <Stack>
                  <SimpleMarkdown content={sample?.description ? sample.description : "no preview"} />
                </Stack>
              </CardBody>

              <CardFooter>
                <Flex w='90%' flexGrow={"column"} justifyContent='space-between'>
                  <Box>
                    <Link href={"/click-flow/" + sample.path.split(".")[0]}>
                      <Button>{dict["view-here"]}</Button>
                    </Link>
                  </Box>
                </Flex>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default StartlingByEachStepList;

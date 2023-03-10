"use client";

import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  CardHeader,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { SdPrompt } from "@/components/StableDiffusion/SdPrompt";
import samples from "@/assets/stable-diffusion/samples/index.json";
import { ExternalLinkIcon, InfoIcon } from "@chakra-ui/icons";
import { parseStableDiffusionData } from "@/data-processor/SduiParser";
import { CP_GITHUB_ASSETS } from "@/configs/constants";
import { StableDiffusionGenData } from "@/data-processor/StableDiffusionGenData";
import styled from "@emotion/styled";

type StableDiffusionSample = {
  name: string;
  author: string;
  category: string;
  homepage: string;
  artists: {
    preview: string;
    prompt: string;
  }[];
  path: string;
};

function SdPromptPopover(
  isOpen: boolean,
  onClose: () => void,
  parsedPrompt: StableDiffusionGenData,
) {
  return (
    <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} placement='right' closeOnBlur={true}>
      <PopoverContent w={"360px"}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <SdPrompt readonly prompt={parsedPrompt} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function StableDiffusionExamples({ i18n }: GeneralI18nProps) {
  const dict = i18n.dict;

  function ArticleCard(index: number, sample: StableDiffusionSample, artist: { preview: string; prompt: string }) {
    const parsedPrompt = parseStableDiffusionData(artist.prompt);
    const { isOpen, onToggle, onClose } = useDisclosure();

    return (
      <Card key={`sample-${index}`} mt='2' sx={{ breakInside: "avoid-column" }}>
        <CardHeader>
          <Text>
            {sample.name} -{" "}
            <Link href={sample.homepage} isExternal>
              {sample.author} <ExternalLinkIcon />
            </Link>
          </Text>
        </CardHeader>
        <CardBody>
          <StyledStack>
            <Image src={artist.preview} alt='' width={512} height={512} />
            {SdPromptPopover(isOpen, onClose, parsedPrompt)}
            <StyledInfoIcon color={"white"} onClick={onToggle} onFocus={onToggle} />
          </StyledStack>
        </CardBody>
      </Card>
    );
  }

  const stableDiffusionLink = `${CP_GITHUB_ASSETS}/stable-diffusion/samples`;
  return (
    <>
      <Alert>
        <AlertIcon />
        <AlertTitle>{dict["share-my-stable-diffusion"]}:</AlertTitle>
        <Link href={stableDiffusionLink} isExternal>
          Pull Request <ExternalLinkIcon />
        </Link>
      </Alert>
      {samples.length > 0 && (
        <Box w='100%' maxW='1200px' mx='auto' sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}>
          {samples.map((sample) => sample.artists.map((artist, index) => ArticleCard(index, sample, artist)))}
        </Box>
      )}
    </>
  );
}

const StyledStack = styled(Stack)`
  position: relative;
`;

const StyledInfoIcon = styled(InfoIcon)`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 16px;
  height: 16px;
`;

export default StableDiffusionExamples;

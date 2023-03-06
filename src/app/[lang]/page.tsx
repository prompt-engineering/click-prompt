"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, Button, chakra, Container, Stack, Text } from "@chakra-ui/react";
import { ClickPromptIcon } from "@/components/CustomIcon";
import { GITHUB_URL } from "@/configs/const";
import { ClickPromptButton } from "@/components/ClickPromptButton";
import { getDictionary, type SupportedLocale } from "@/i18n";

type Props = {
  params: { lang: SupportedLocale };
}

function Page({ params: { lang } }: Props) {
  const pathname = usePathname();
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    const dictionary = getDictionary(lang, pathname ?? "/");
    dictionary.then((dict) => {
      setDict(dict.currentPage);
    });
  }, [lang]);

  return (
    <Box mb={20}>
      <Box as='section' pt='6rem' pb={{ base: "0", md: "5rem" }}>
        <Container>
          <Box textAlign='center'>
            <ClickPromptIcon width={128} height={128} />

            <chakra.h1
              maxW='16ch'
              mx='auto'
              fontSize={{ base: "2.25rem", sm: "3rem", lg: "4rem" }}
              fontFamily='heading'
              letterSpacing='tighter'
              fontWeight='extrabold'
              mb='16px'
              lineHeight='1.2'
            >
              {dict?.title}
            </chakra.h1>

            <Text
              maxW='560px'
              mx='auto'
              color='gray.500'
              _dark={{ color: "gray.400" }}
              fontSize={{ base: "lg", lg: "xl" }}
              mt='6'
            >
              {dict?.description}
            </Text>

            <Stack mt='10' spacing='4' justify='center' direction={{ base: "column", sm: "row" }}>
              <Button as='a' size='lg' h='4rem' px='40px' fontSize='1.2rem' href={GITHUB_URL} target='__blank'>
                GitHub
              </Button>
              <ClickPromptButton size='lg' h='4rem' px='40px' text='Hello World' />
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Page;

"use client";

import React, { useRef, useState } from "react";
import { Button, Grid, Link, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import styled from "@emotion/styled";
import { AppData } from '@/i18n'

const ImageNote = styled("div")`
  font-size: 0.8rem;
  color: #888;
`;

type HuggingFaceComponentProps = { model: string; prompt: string, dict: Record<string, string> }
export const HuggingFaceTxt2Img = ({ model, prompt, dict }: HuggingFaceComponentProps) => {
  const [huggingFace, setHuggingFace] = useState({
    image: "",
    loading: false,
    error: "",
    prompt: prompt,
  });

  const callHuggingFace = async (useClipboard = true) => {
    const generatedPrompt = useClipboard ? await navigator.clipboard.readText() : prompt ?? "";
    setHuggingFace({
      image: "",
      loading: true,
      error: "",
      prompt: generatedPrompt,
    });
    const response = await fetch("https://api-inference.huggingface.co/models/" + model, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_HUGGING_FACE_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        inputs: generatedPrompt,
      }),
    });
    if (response.status == 200) {
      const imgBlob = await response.blob();
      const objectURL = URL.createObjectURL(imgBlob);
      setHuggingFace({
        image: objectURL,
        loading: false,
        error: "",
        prompt: huggingFace.prompt,
      });
    } else {
      const errJson = await response.json();
      console.error(errJson);
      setHuggingFace({
        image: "",
        loading: false,
        error:
          response.status == 503
            ? "模型正在启动，请等待至少" + errJson.estimated_time + "秒后使用相同咒语重试"
            : errJson.error,
        prompt: huggingFace.prompt,
      });
    }
  };

  return (
    <SimpleGrid gap={3} p={3} columns={1}>
      <Grid>
        <Link href={"https://huggingface.co/" + model} isExternal>
          {model}
        </Link>
        <SimpleGrid gap={1} p={0} columns={2}>
          <Button
            mt={4}
            colorScheme='teal'
            isLoading={huggingFace && huggingFace.loading}
            onClick={() => callHuggingFace(false)}
          >
            {dict["use-method-2-spell"]}
          </Button>
          <Button
            mt={4}
            colorScheme='teal'
            isLoading={huggingFace && huggingFace.loading}
            onClick={() => callHuggingFace(true)}
          >
            {dict["read-spell-from-clipboard"]}
          </Button>
        </SimpleGrid>
      </Grid>
      <Grid>
        <ImageNote>{dict["notes-black-image"]}</ImageNote>
        {huggingFace && huggingFace.image && (
          <Image alt={huggingFace.prompt} src={huggingFace.image} width={512} height={512} />
        )}
        {huggingFace && huggingFace.error && <Text>{huggingFace.error}</Text>}
      </Grid>
    </SimpleGrid>
  );
};

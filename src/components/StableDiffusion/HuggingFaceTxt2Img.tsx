"use client";

import React, { useState } from "react";
import { Button, Flex, Grid, Link, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import styled from "@emotion/styled";
import { StableDiffusionDataToString } from "@/data-processor/SduiParser";
import { StableDiffusionGenData } from "@/data-processor/StableDiffusionGenData";

const ImageNote = styled("div")`
  font-size: 0.8rem;
  color: #888;
  width: 256px;
`;

type HuggingFaceComponentProps = { model: string; prompt: StableDiffusionGenData; dict: Record<string, string> };
export const HuggingFaceTxt2Img = ({ model, prompt, dict }: HuggingFaceComponentProps) => {
  const [huggingFace, setHuggingFace] = useState({
    image: "",
    loading: false,
    error: "",
    prompt: StableDiffusionDataToString(prompt),
  });

  const callHuggingFace = async (wait_for_model?: boolean) => {
    const payload = {
      inputs: prompt.prompt,
      parameters: {
        negative_prompt: [prompt.negativePrompt],
        num_images_per_prompt: 1
      },
      options: {}
    };
    if (wait_for_model)
      payload.options = {
        wait_for_model: true
      }
    return fetch("https://api-inference.huggingface.co/models/" + model, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.NEXT_PUBLIC_HUGGING_FACE_ACCESS_TOKEN,
      },
      body: JSON.stringify(payload)
    });
  };

  const handleOnGenerate = async () => {
    if (!prompt) return;
    if (!prompt.prompt) return;
    setHuggingFace({
      image: "",
      loading: true,
      error: "",
      prompt: StableDiffusionDataToString(prompt),
    });
    let response = await callHuggingFace();
    if (response.status == 503) {
      response = await callHuggingFace(true);
    }
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
      setHuggingFace({
        image: "",
        loading: false,
        error:
          response.status == 503
            ? dict["model_503_error_prefix"] + errJson.estimated_time + dict["model_503_error_suffix"]
            : errJson.error,
        prompt: huggingFace.prompt,
      });
    }
  };

  return (
    <SimpleGrid gap={3} p={3} columns={1} border='1px solid lightgrey'>
      <Grid>
        <Flex alignItems='center'>
          <Image alt="Hugging Face" src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" width={20} height={20} /> &nbsp;Hugging Face
        </Flex>
        <Link mt={1} href={"https://huggingface.co/" + model} isExternal>
          {model}
        </Link>
        <Button
          mt={2}
          colorScheme='teal'
          isLoading={huggingFace && huggingFace.loading}
          onClick={() => handleOnGenerate()}
        >
          {dict["generate"]}
        </Button>
      </Grid>
      <Grid>
        <ImageNote>{dict["notes-black-image"]}</ImageNote>
        {huggingFace && huggingFace.image && (
          <Image alt={huggingFace.prompt} src={huggingFace.image} width={256} height={256} />
        )}
        {huggingFace && huggingFace.error && <Text>{huggingFace.error}</Text>}
      </Grid>
    </SimpleGrid>
  );
};

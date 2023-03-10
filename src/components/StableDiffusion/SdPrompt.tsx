"use client";

import React, { useRef, useEffect, ChangeEvent, MouseEvent } from "react";
import {
  Button,
  Grid,
  Text,
  Textarea
} from "@chakra-ui/react";
import CopyComponent from "@/components/CopyComponent";
import { StableDiffusionGenData } from "@/data-processor/StableDiffusionGenData";
import { parseStableDiffusionData, StableDiffusionDataToString } from "@/data-processor/SduiParser";
import styled from "@emotion/styled";

const StyledGreyTextarea = styled(Textarea)`
  background-color: #f7fafc;
  height: 100px;
`;

type SdPromptComponentProps = {  prompt: StableDiffusionGenData, readonly?: boolean, dict?: Record<string, string>, onChange?: Function };
export function SdPrompt({ prompt, readonly = false, dict = {}, onChange = () => {} }: SdPromptComponentProps) {
  const promptRef = useRef<HTMLTextAreaElement | null>(null);
  const negativePromptRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOnChange = function(event: ChangeEvent<HTMLTextAreaElement>) : void {
    const newPrompt: StableDiffusionGenData = {
      prompt: promptRef.current?.value ?? "",
      negativePrompt: negativePromptRef.current?.value ?? ""
    };
    onChange(event, newPrompt);
  }

  const handleOnLoadFromClipboard = async function(event: MouseEvent<HTMLButtonElement>) : Promise<void> {
    const clipboardText = await navigator.clipboard.readText();
    if (!clipboardText) return;
    const newPrompt = parseStableDiffusionData(clipboardText);
    onChange(event, newPrompt);
  }

  useEffect(() => {
    if (promptRef.current) promptRef.current.value = prompt.prompt;
    if (negativePromptRef.current) negativePromptRef.current.value = prompt.negativePrompt;
  });
  
  return (
    <Grid>
      <Text>Prompt:</Text>
      <StyledGreyTextarea ref={promptRef} isReadOnly={readonly} resize="none" onChange={handleOnChange}></StyledGreyTextarea>
      <Text pt={2}>NegativePrompt:</Text>
      <StyledGreyTextarea ref={negativePromptRef} isReadOnly={readonly} resize="none" onChange={handleOnChange}></StyledGreyTextarea>
      {readonly ? <Grid pt={2}>
        <Text>Model: {prompt.model}</Text>
        {prompt.lora && prompt.lora.length > 0 && <Text>LoRA: {prompt.lora.join(", ")} </Text>}
        <Text>Sampler: {prompt.sampler}</Text>
        <Text>CFG Scale: {prompt.cfgScale}</Text>
        <Text>Steps: {prompt.steps}</Text>
        <Text>Seed: {prompt.seed}</Text>
        <Button variant='solid' colorScheme='teal' marginLeft='auto'>
          <CopyComponent value={StableDiffusionDataToString(prompt)} />
        </Button>
      </Grid> : <Grid pt={5}>
        <Button variant='solid' colorScheme='teal' onClick={(event) => handleOnLoadFromClipboard(event)}>{dict["import_from_clipboard"]}</Button>
      </Grid>}
    </Grid>
  );
}
"use client";

import React, { ChangeEventHandler, createRef, DragEventHandler, MouseEventHandler, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Link,
  SimpleGrid,
  useToast,
  Image,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function StableDiffusionDeepDanbooru({ i18n }: GeneralI18nProps) {
  const dict = i18n.dict;
  const toast = useToast();
  const [file, setFile] = useState(new Blob());
  const [filePreview, setFilePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([] as Tag[]);
  const [tagSelected, setTagSelected] = useState({} as { [key: string]: boolean });
  const fileInputRef = createRef<HTMLInputElement>();

  type Tag = {
    label: string;
    confidence: number;
  };

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files?.length) return;
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFilePreview(URL.createObjectURL(uploadedFile));
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setFilePreview(URL.createObjectURL(droppedFile));
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleReset: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(new Blob());
    setFilePreview("");
    setTags([]);
    setTagSelected({});
  };

  const handleSubmit = () => {
    if (tags.length) {
      const textarea = document.createElement("textarea");
      // prevent mobile device popup keyboard
      textarea.setAttribute("readonly", "readonly");
      textarea.value = Object.keys(tagSelected).join(", ");
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast({
        title: "Copied to clipboard",
        position: "top",
        status: "success",
      });
    } else if (file) {
      setIsLoading(true);
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const srcData = fileReader.result as string;
        try {
          const tags = await getTags(srcData);
          const tagsMap: { [key: string]: boolean } = {};
          if (tags && tags.length) {
            let flag = true;
            for (const tagIndex in tags) {
              const tag = tags[tagIndex];
              if (tag.label.indexOf("rating:safe") != -1) {
                flag = tag.confidence <= 0.8;
              }
              tagsMap[tag.label] = true;
            }
            if (!flag) {
              setTags(tags);
              setTagSelected(tagsMap);
            }
          }
        } catch (e) {}
        setIsLoading(false);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleTagSelectedChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const tag = e.target.name;
    if (!e.target.checked && tag in tagSelected) {
      delete tagSelected[tag];
    } else if (e.target.checked) {
      tagSelected[tag] = true;
    }
    setTagSelected(tagSelected);
  };

  function randomhash(length: number): string {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async function getTags(image: string): Promise<Tag[]> {
    const HFAPI = "wss://hysts-deepdanbooru.hf.space/queue/join";
    const hash = randomhash(12);
    const send_hash = {
      fn_index: 0,
      session_hash: hash,
    };
    const img_data = {
      fn_index: 0,
      data: [image, 0.5],
      session_hash: hash,
    };
    const socket = new WebSocket(HFAPI);
    return new Promise((resolve, reject) => {
      socket.onerror = (event: Event) => {
        reject(new Error(`WebSocket error: ${event}`));
      };
      socket.onmessage = async (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data["msg"] === "send_hash") {
          socket.send(JSON.stringify(send_hash));
        } else if (data["msg"] === "send_data") {
          socket.send(JSON.stringify(img_data));
        } else if (data["msg"] === "process_completed") {
          const tags = data["output"]["data"][0]["confidences"];
          resolve(tags);
        }
      };
    });
  }

  return (
    <>
      <Heading as={"h3"}>DeepDanbooru</Heading>
      <Box style={{ padding: "4px 0 2px 0" }}>
        GitHub:{" "}
        <Link href='https://github.com/KichangKim/DeepDanbooru' isExternal>
          KichangKim/DeepDanbooru <ExternalLinkIcon />
        </Link>
      </Box>
      <Box style={{ margin: "0 0 12px 0" }}>
        Powered by:{" "}
        <Link href='https://huggingface.co/spaces/hysts/DeepDanbooru' isExternal>
          <Image
            alt='Hugging Face'
            src='https://huggingface.co/front/assets/huggingface_logo-noborder.svg'
            boxSize='20px'
            style={{ display: "inline" }}
          />{" "}
          Hugging Face - hysts/DeepDanbooru <ExternalLinkIcon />
        </Link>
      </Box>
      <Alert>
        <AlertIcon />
        <AlertTitle>{dict["warning"]}</AlertTitle>
      </Alert>
      <SimpleGrid columns={2} mt={2} gap={2}>
        <Grid>
          <Flex
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
            style={{
              width: "100%",
              minHeight: "256px",
              maxHeight: "512px",
              border: "1px dashed #ccc",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              disabled={isLoading}
              ref={fileInputRef}
              type='file'
              onChange={handleFileUpload}
              style={{ display: "none" }}
              accept='image/*'
            />
            {filePreview && file ? (
              <Image
                src={filePreview}
                alt={file.name}
                style={{ margin: "0 auto", maxHeight: "100%", maxWidth: "100%" }}
              />
            ) : (
              <p style={{ textAlign: "center" }}>{dict["drag-n-drop"]}</p>
            )}
          </Flex>
          <SimpleGrid columns={2} gap={2} mt={2} alignItems='end'>
            <Button onClick={handleReset} isLoading={isLoading}>
              {dict["clear"]}
            </Button>
            <Button
              onClick={handleSubmit}
              colorScheme='teal'
              isLoading={isLoading}
              isDisabled={(file && filePreview) || tags.length ? false : true}
            >
              {tags.length ? dict["copy"] : dict["submit"]}
            </Button>
          </SimpleGrid>
        </Grid>
        <Grid style={{ border: "1px dashed #ccc" }}>
          {tags &&
            tags.map((tag) => {
              if (tag.label.indexOf("rating") != -1) return;
              return (
                <Box padding={2} style={{ borderBottom: "1px dashed #ccc" }} key={tag.label}>
                  <Box
                    backgroundColor='lightgray'
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "5px",
                      overflow: "hidden",
                      borderRadius: "4px",
                    }}
                  >
                    <Box
                      backgroundColor='teal'
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "0",
                        width: tag.confidence * 100 + "%",
                        height: "5px",
                        borderRadius: "4px",
                      }}
                    ></Box>
                  </Box>
                  <Checkbox
                    name={tag.label}
                    defaultChecked
                    checked={tagSelected[tag.label]}
                    onChange={handleTagSelectedChange}
                    style={{ position: "relative", width: "100%", marginTop: "2px" }}
                  >
                    {tag.label}
                    <span style={{ position: "absolute", right: 0, top: 0 }}>
                      {Math.round(tag.confidence * 10000) / 100}%
                    </span>
                  </Checkbox>
                </Box>
              );
            })}
        </Grid>
      </SimpleGrid>
    </>
  );
}

export default StableDiffusionDeepDanbooru;

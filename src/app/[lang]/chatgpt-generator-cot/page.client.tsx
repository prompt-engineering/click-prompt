"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Box, FormControl, FormLabel, Grid, Heading, IconButton, Input, SimpleGrid, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { Form, Formik } from "formik";
import { numberToChineseOrdinal } from "chinese-numbering";

import CopyComponent from "@/components/CopyComponent";
import { ClickPromptButton } from "@/components/ClickPromptButton";

function ChatGptCotGenerator({ i18n, locale }: GeneralI18nProps) {
  const dict = i18n.dict;
  const toast = useToast();
  const [markdown, setMarkdown] = useState("");

  const [name, setName] = useState("wula");
  const [lines, setLines] = useState([
    dict["introduction-step1"],
    dict["introduction-step2"],
    dict["introduction-step3"],
    dict["introduction-step4"],
    dict["introduction-step5"],
  ]);

  useEffect(() => {
    setMarkdown(
      `${dict["introduction-heading1"]} ${name}${dict["introduction-heading2"]}

${lines
  .map(
    (line, index) =>
      `- ${locale === "en-US" ? "Step" : ""} ${locale === "en-US" ? index + 1 : numberToChineseOrdinal(index + 1)}${
        locale === "zh-CN" ? "步" : ""
      }. ${line}`,
  )
  .join("\n")}

${dict["introduction-tail"]}`.replaceAll("<GameName>", name),
    );
  }, [name, lines]);

  const addLine = () => {
    if (lines.length === 20) {
      toast({
        title: "You can't add more than 20 lines",
        position: "top",
      });
      return;
    }
    setLines((lines) => [...lines, ""]);
  };

  const removeLine = (index: number) => {
    if (lines.length === 1) {
      toast({
        title: "You can't remove the last line",
        position: "top",
      });
      return;
    }
    setLines((lines) => lines.filter((_, i) => i !== index));
  };

  const changeLine = (index: number, value: string) => {
    if (value.length > 200) {
      toast({
        title: "You can't add more than 200 characters",
        position: "top",
      });
      return;
    }
    setLines((lines) => lines.map((line, i) => (i === index ? value : line)));
  };

  return (
    <SimpleGrid columns={1} spacing={4}>
      <Heading as='h2'>{dict["heading"]}</Heading>
      <Heading as='h3' size='md'>
        {dict["subheading"]}
      </Heading>
      <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
        {markdown}
      </ReactMarkdown>
      <Box className='flex justify-end p-4'>
        <CopyComponent boxSize={10} value={markdown} />
        <ClickPromptButton text={markdown} />
      </Box>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <FormControl key='name' id='name' mt={4}>
            <FormLabel>GameName</FormLabel>
            <Input placeholder={dict["your-name"]} value={name} onChange={(ev) => setName(ev.target.value)} />
          </FormControl>
          <Grid gap={6} templateColumns={"auto 4rem"} alignItems='end'>
            {/* 第一步到第 N 步 */}
            {lines.map((line, index) => (
              <Fragment key={index}>
                <FormControl key='step' id='step' mt={4}>
                  <RemovableLabel dict={dict} removeLine={removeLine} index={index} />
                  <Input
                    placeholder={dict["step"]}
                    value={line}
                    onChange={(event) => changeLine(index, event.target.value)}
                  />
                </FormControl>
                {index + 1 === lines.length ? (
                  <IconButton aria-label={dict["add-step"]} onClick={addLine}>
                    <AddIcon />
                  </IconButton>
                ) : (
                  <div></div>
                )}
              </Fragment>
            ))}
          </Grid>
        </Form>
      </Formik>
    </SimpleGrid>
  );
}

function RemovableLabel({
  dict,
  removeLine,
  index,
}: {
  dict: Record<string, string>;
  removeLine: (index: number) => void;
  index: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <FormLabel
      onClick={() => removeLine(index)}
      className='w-16 hover:cursor-pointer'
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {hover ? <span className='text-red-500'>{dict["delete-step"]}</span> : dict["step-label"] + (index + 1)}
    </FormLabel>
  );
}

export default ChatGptCotGenerator;

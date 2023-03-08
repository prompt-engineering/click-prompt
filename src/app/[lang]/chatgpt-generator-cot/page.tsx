"use client";

import React, { useEffect, useState } from "react";
import { Box, FormControl, FormLabel, Grid, Heading, IconButton, Input, SimpleGrid, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { Form, Formik } from "formik";
import { numberToChineseOrdinal } from "chinese-numbering";

import CopyComponent from "@/components/CopyComponent";
import { ClickPromptButton } from "@/components/ClickPromptButton";

function ChatGptCotGenerator() {
  const toast = useToast();
  const [markdown, setMarkdown] = useState("");

  const [name, setName] = useState("wula");
  const [lines, setLines] = useState([
    '问题分析：每一轮游戏，你将看到一个以 "<GameName>:" 开头的问题，你需要分析这个问题并简单介绍一下通常解决这个问题的方法。',
    "代码编写：你需要用 JavaScript 编写解决这个问题的代码，并输出对应的代码，并介绍一下你的代码（不少于 200 字）。",
    "代码执行：你需要作为 JavaScript Console 执行第二步写的代码，如果没有给出测试数据，你需要自己随机生成测试数据，并将这些数据输入到代码中进行计算。",
    "错误处理：如果你的代码存在错误或无法正常执行，你需要输出错误，并回到第二步重新开始游戏，直到你的代码能够正常工作。",
    "总结：你需要用不少于 100 字左右总结一下这个问题，以及你的解决方案，让其他人可以简单了解这个问题及其解决方案。",
  ]);

  useEffect(() => {
    setMarkdown(
      `我们来玩一个编程游戏名为 ${name}，包含五个步骤：

${lines.map((line, index) => `- ${numberToChineseOrdinal(index + 1)}步. ${line}`).join("\n")}

明白这个游戏怎么玩儿了嘛？那我们开始吧！`.replaceAll("<GameName>", name),
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
      <Heading as='h2'>ChatGPT 思维链模式</Heading>
      <Heading as='h3' size='md'>
        预期输出
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
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        <Form>
          <FormControl key='name' id='name' mt={4}>
            <FormLabel>GameName</FormLabel>
            <Input placeholder={"Your game name"} value={name} onChange={(ev) => setName(ev.target.value)} />
          </FormControl>
          <Grid gap={6} templateColumns={"auto 4rem"} alignItems='end'>
            {/* 第一步到第 N 步 */}
            {lines.map((line, index) => (
              <>
                <FormControl key='step' id='step' mt={4}>
                  <RemovableLabel removeLine={removeLine} index={index} />
                  <Input
                    placeholder={"Step"}
                    value={line}
                    onChange={(event) => changeLine(index, event.target.value)}
                  />
                </FormControl>
                {index + 1 === lines.length ? (
                  <IconButton aria-label='Add step' onClick={addLine}>
                    <AddIcon />
                  </IconButton>
                ) : (
                  <div></div>
                )}
              </>
            ))}
          </Grid>
        </Form>
      </Formik>
    </SimpleGrid>
  );
}

function RemovableLabel({ removeLine, index }: { removeLine: (index: number) => void; index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <FormLabel
      onClick={() => removeLine(index)}
      className='w-16 hover:cursor-pointer'
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {hover ? <span className='text-red-500'>delete</span> : "Step " + (index + 1)}
    </FormLabel>
  );
}

export default ChatGptCotGenerator;

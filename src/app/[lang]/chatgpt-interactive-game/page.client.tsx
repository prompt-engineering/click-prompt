"use client";

import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  // useToast,
  Alert,
  AlertIcon,
  Link,
  Text,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { Form, Formik } from "formik";

import CopyComponent from "@/components/CopyComponent";

const ROLES = ["天才", "豪门弃子", "修炼废物", "冒险家", "孤儿", "情圣", "幸运儿", "强者", "屌丝", "学者"];
const WORLDS = ["仙侠", "武侠", "魔幻", "玄幻", "科幻", "都市", "游戏", "丧尸", "星空"];
const CHEATS = [
  "攻击力极高",
  "随身携带的升级系统",
  "随身携带的有血海深仇老爷爷",
  "地摊上捡来的神书",
  "被封印的神器",
  "坠崖之后在山洞里得到传承",
  "预知未来片段",
  "自己前世的记忆",
  "一群比较听话的小弟",
  "一个能力特别强大的宠物",
  "神秘的力量",
  "被未婚妻退婚",
  "穿越时空",
  "红色内裤",
];

const DETAIL = `在一个修仙门派蜀山剑派山脚下的小村庄里过着与世隔绝的生活，有一天大魔头狗蛋袭击了蜀山剑派，屠尽满门，只有掌门拼死逃出，然后在小村庄重伤不支，临终前遇到了在外面玩耍的主角，把门派绝学和掌门至包青霞剑传给了主角，只有一个要求，重振蜀山剑派，杀死大魔头狗蛋，此时正值天地大变，仙佛归来，主角如何达成愿望呢？`;

function ChatgptInteractiveGame({}: GeneralRSCProps) {
  // const toast = useToast();
  const [markdown, setMarkdown] = useState("");

  const [name, setName] = useState("龙傲天");
  const [world, setWorld] = useState("仙侠");
  const [role, setRole] = useState("孤儿");
  const [cheat, setCheat] = useState("被封印的神器");
  const [detail, setDetail] = useState("");
  const [step, setStep] = useState(10);
  const [choices, setChoices] = useState("两个");

  useEffect(() => {
    setMarkdown(
      `你是一个交互式文本游戏引擎，游戏的背景故事是：

主角名叫${name}，出生在一个${world}世界，是一个${role}，拥有的能力是${cheat}，${detail || DETAIL}

请设计一个游戏脚本，可以在 ${step} 步之内完成主角的愿望${choices === "free" ? "" : `，每一步${choices}选项`}。
`,
    );
  }, [name, world, role, cheat, step, choices, detail]);

  return (
    <div>
      <Alert status='info'>
        <AlertIcon />
        交互式游戏需要使用到 System 设置，请在
        <Link href='https://platform.openai.com/playground' isExternal={true}>
          ChatGPT Playground
          <ExternalLinkIcon mx='2px' />
        </Link>
        上操作。
      </Alert>
      <Heading as='h3' size='md' mt='20px'>
        System 设置
      </Heading>
      <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
        {markdown}
      </ReactMarkdown>
      <CopyComponent className='flex justify-end p-4' value={markdown} />
      <Heading as='h3' size='md' mt='20px'>
        User 输入
      </Heading>
      <Text>你好，我是{name}。</Text>
      <CopyComponent className='flex justify-end p-4' value={`你好，我是${name}。`} />
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <FormControl key='step' id='step' mt={4}>
            <FormLabel>游戏步数</FormLabel>
            <NumberInput
              placeholder='输入游戏步数'
              min={5}
              max={20}
              value={step}
              onChange={(_, value) => setStep(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl key='choices' id='choices' mt={4}>
            <FormLabel>每步选项</FormLabel>
            <Select placeholder='每步选项' value={choices} onChange={(ev) => setChoices(ev.target.value)}>
              <option value='free'>自由输入</option>
              <option value='两个'>两个</option>
              <option value='三个'>三个</option>
              <option value='四个'>四个</option>
              <option value='五个'>五个</option>
              <option value='至少两个'>至少两个</option>
              <option value='三到五个'>三到五个</option>
            </Select>
          </FormControl>
          <FormControl key='name' id='name' mt={4}>
            <FormLabel>主角姓名</FormLabel>
            <Input placeholder='输入主角姓名' value={name} onChange={(ev) => setName(ev.target.value)} />
          </FormControl>
          <FormControl key='world' id='world' mt={4}>
            <FormLabel>世界背景</FormLabel>
            <Select placeholder='设置世界背景' value={world} onChange={(ev) => setWorld(ev.target.value)}>
              {WORLDS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl key='role' id='role' mt={4}>
            <FormLabel>主角身份</FormLabel>
            <Select placeholder='设置主角身份' value={role} onChange={(ev) => setRole(ev.target.value)}>
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl key='cheat' id='cheat' mt={4}>
            <FormLabel>主角的金手指</FormLabel>
            <Select placeholder='设置主角的金手指' value={cheat} onChange={(ev) => setCheat(ev.target.value)}>
              {CHEATS.map((cheat) => (
                <option key={cheat} value={cheat}>
                  {cheat}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl key='detail' id='detail' mt={4}>
            <FormLabel>详细设定</FormLabel>
            <Textarea placeholder={DETAIL} value={detail} onChange={(ev) => setDetail(ev.target.value)} />
          </FormControl>
        </Form>
      </Formik>
    </div>
  );
}

export default ChatgptInteractiveGame;

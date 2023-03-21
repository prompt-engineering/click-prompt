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

function ChatgptInteractiveGame({ i18n }: GeneralI18nProps) {
  const dict = i18n.dict;
  const ROLES = new Array(10).fill(undefined).map((_, i) => dict["roles_" + (i + 1)]);
  const WORLDS = new Array(9).fill(undefined).map((_, i) => dict["worlds_" + (i + 1)]);
  const CHEATS = new Array(14).fill(undefined).map((_, i) => dict["cheats_" + (i + 1)]);

  const DETAIL = dict["detail"] ?? "";

  // const toast = useToast();
  const [markdown, setMarkdown] = useState("");

  const [name, setName] = useState(dict["char-name-default"]);
  const [role, setRole] = useState(ROLES[4] ?? "");
  const [world, setWorld] = useState(WORLDS[0] ?? "");
  const [cheat, setCheat] = useState(CHEATS[4] ?? "");
  const [detail, setDetail] = useState("");
  const [step, setStep] = useState(10);
  const [choices, setChoices] = useState(dict["input-option-2"] ?? "");

  useEffect(() => {
    setMarkdown(
      `${dict["heading1"]}

${dict["heading2"]}${name}${dict["heading3"]}${world}${dict["heading4"]}${role}${dict["heading5"]}${cheat}，${
        detail || DETAIL
      }

${dict["heading6"]} ${step} ${dict["heading7"]}${
        choices === "free" ? "" : `${dict["heading8"]}${choices}${dict["heading9"]}`
      }。
`,
    );
  }, [name, world, role, cheat, step, choices, detail]);

  return (
    <div>
      <Alert status='info'>
        <AlertIcon />
        {dict["tip-head"]}
        <Link href='https://platform.openai.com/playground' isExternal={true}>
          {dict["tip-body"]}
          <ExternalLinkIcon mx='2px' />
        </Link>
        {dict["tip-tail"]}
      </Alert>
      <Heading as='h3' size='md' mt='20px'>
        {dict["system-settings"]}
      </Heading>
      <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
        {markdown}
      </ReactMarkdown>
      <CopyComponent className='flex justify-end p-4' value={markdown} />
      <Heading as='h3' size='md' mt='20px'>
        User {dict["input"]}
      </Heading>
      <Text>
        {dict["hello-i-am"]}
        {name}。
      </Text>
      <CopyComponent className='flex justify-end p-4' value={`${dict["hello-i-am"]}${name}。`} />
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <FormControl key='step' id='step' mt={4}>
            <FormLabel>{dict["game-steps"]}</FormLabel>
            <NumberInput
              placeholder={dict["input-steps"]}
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
            <FormLabel>{dict["choices-every-step"]}</FormLabel>
            <Select
              placeholder={dict["choices-every-step"]}
              value={choices}
              onChange={(ev) => setChoices(ev.target.value)}
            >
              <option value={dict["input-freely"]}>{dict["input-freely"]}</option>
              <option value={dict["input-option-2"]}>{dict["input-option-2"]}</option>
              <option value={dict["input-option-3"]}>{dict["input-option-3"]}</option>
              <option value={dict["input-option-4"]}>{dict["input-option-4"]}</option>
              <option value={dict["input-option-5"]}>{dict["input-option-5"]}</option>
              <option value={dict["input-option-at-lease-2"]}>{dict["input-option-at-lease-2"]}</option>
              <option value={dict["input-option-3-to-5"]}>{dict["input-option-3-to-5"]}</option>
            </Select>
          </FormControl>
          <FormControl key='name' id='name' mt={4}>
            <FormLabel>{dict["label-main-char-name"]}</FormLabel>
            <Input
              placeholder={dict["set"] + dict["label-main-char-name"]}
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </FormControl>
          <FormControl key='world' id='world' mt={4}>
            <FormLabel>{dict["label-backstory"]}</FormLabel>
            <Select
              placeholder={dict["set"] + dict["label-backstory"]}
              value={world}
              onChange={(ev) => setWorld(ev.target.value)}
            >
              {WORLDS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl key='role' id='role' mt={4}>
            <FormLabel>{dict["label-role"]}</FormLabel>
            <Select
              placeholder={dict["set"] + dict["label-role"]}
              value={role}
              onChange={(ev) => setRole(ev.target.value)}
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl key='cheat' id='cheat' mt={4}>
            <FormLabel>{dict["label-cheats"]}</FormLabel>
            <Select
              placeholder={dict["set"] + dict["label-cheats"]}
              value={cheat}
              onChange={(ev) => setCheat(ev.target.value)}
            >
              {CHEATS.map((cheat) => (
                <option key={cheat} value={cheat}>
                  {cheat}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl key='detail' id='detail' mt={4}>
            <FormLabel>{dict["label-detail"]}</FormLabel>
            <Textarea placeholder={DETAIL} value={detail} onChange={(ev) => setDetail(ev.target.value)} />
          </FormControl>
        </Form>
      </Formik>
    </div>
  );
}

export default ChatgptInteractiveGame;

"use client";

import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import sdImage from "@/assets/stable-diffusion-demo.jpeg";
import Image from "next/image";

type SdPromptField = {
  name: string;
  label: string;
  selectValues: string[];

  children?: SdPromptField[];
};

/* FormControl: 头发, 眼睛, 脸型, 身体, 胸部, 腰部, 腿部, 脚部 */
const sdDetailedPromptFields: SdPromptField[] = [
  {
    name: "hair",
    label: "头发",
    selectValues: ["Long", "Short", "Bald"],
  },
  {
    name: "eyes",
    label: "眼睛",
    selectValues: ["Normal", "Black", "Red"],
  },
  {
    name: "face",
    label: "脸型",
    selectValues: ["Normal", "Round", "Square"],
  },
  {
    name: "body",
    label: "身体",
    selectValues: ["Normal", "Fat", "Thin"],
  },
  {
    name: "chest",
    label: "胸部",
    selectValues: ["Normal", "Large", "Small"],
  },
  {
    name: "waist",
    label: "腰部",
    selectValues: ["Normal", "Large", "Small"],
  },
  {
    name: "legs",
    label: "腿部",
    selectValues: ["Normal", "Large", "Small"],
  },
  {
    name: "feet",
    label: "脚部",
    selectValues: ["Normal", "Large", "Small"],
  },
];

/* FormControl: 通用质量,光线,镜头,头部,场景,身体,服饰,动作,背景 */
const sdPromptFields: SdPromptField[] = [
  {
    name: "quality",
    label: "通用质量",
    selectValues: ["Normal", "High"],
  },
  {
    name: "light",
    label: "光线",
    selectValues: ["Daylight", "Night", "Indoor"],
  },
  {
    name: "camera",
    label: "镜头",
    selectValues: ["Front", "Back", "Side"],
  },
  {
    name: "head",
    label: "头部",
    selectValues: ["Front", "Back", "Side"],
  },
  {
    name: "scene",
    label: "场景",
    selectValues: ["Front", "Back", "Side"],
  },
  {
    name: "body",
    label: "身体",
    selectValues: ["Front", "Back", "Side"],
  },
  {
    name: "clothes",
    label: "服饰",
    selectValues: ["Front", "Back", "Side"],
  },
  {
    name: "action",
    label: "动作",
    selectValues: ["Front", "Back", "Side"],
  },
  {
    name: "background",
    label: "背景",
    selectValues: ["Front", "Back", "Side"],
  },
];

function StableDiffusionGenerator() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <div>
      <Image src={sdImage} alt='stable-diffusion-demo' />
      <Text>
        Pormpt： particle effects small breasts, 1 girl, solo, masterpiece, best
        quality, highres, original, extremely detailed 8K wallpaper, greasy
        skin, realistic and delicate facial features, slim
        waist,ultra-detailed,illustration ,ray tracing,intricate detail, colored
        tips,colored inner hair, gradient eyes,eyelashes,finely detail, depth of
        field, beyond compare, cinematic lighting, tranditional, in gentle
        breeze dance from ethereal chance. An aura of peace,beyond compare,
        cinematic lighting, dramatic angle, (arms arms behind back), fov,
        detailed eyes, peach blossom
      </Text>
      <Formik
        initialValues={{ quality: "Normal" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        <Form>
          <SimpleGrid gap={12} p={12} columns={3}>
            {sdPromptFields.map((field) => (
              <FormControl key={field.name} id={field.name} mt={4}>
                <FormLabel>{field.label}</FormLabel>
                <Select name={field.name} placeholder={`Select ${field.label}`}>
                  {field.selectValues.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </FormControl>
            ))}
            <Text>Body</Text>
            {sdDetailedPromptFields.map((field) => (
              <FormControl key={field.name} id={field.name} mt={4}>
                <FormLabel>{field.label}</FormLabel>
                <Select name={field.name} placeholder={`Select ${field.label}`}>
                  {field.selectValues.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </FormControl>
            ))}
          </SimpleGrid>
          <Button
            mt={4}
            colorScheme='teal'
            isLoading={isSubmitting}
            type='submit'
          >
            Generator
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default StableDiffusionGenerator;

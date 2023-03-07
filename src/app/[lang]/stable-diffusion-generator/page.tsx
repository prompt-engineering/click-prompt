"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Image from "next/image";
import CopyComponent from "@/components/CopyComponent";
import PromptFieldForm, { SdPromptField } from "@/components/PromptFieldForm";
import sdImage from "@/assets/images/stable-diffusion-demo.jpeg";
import { WebStorage } from "@/utils/storage.util";
import { flatten } from "lodash-es";
import { ClickPromptButton } from "@/components/ClickPromptButton";
import { HuggingFaceText2Img } from "./HuggingFaceText2Img";

const sdDetailedPromptFields: SdPromptField[] = [
  {
    name: "body_shape",
    label: "体型",
    selectValues: [
      { key: "瘦的", value: "thin body" },
      { key: "正常体型", value: "normal body shape" },
      { key: "丰满的", value: "plump body" },
      { key: "肥胖的", value: "fat body" },
    ],
  },
  {
    name: "face",
    label: "脸型",
    selectValues: [
      { key: "圆脸", value: "round face" },
      { key: "方脸", value: "square face" },
      { key: "长脸", value: "long face" },
      { key: "瓜子脸", value: "oval face" },
      { key: "三角脸", value: "triangle face" },
      { key: "心形脸", value: "heart face" },
      { key: "菱形脸", value: "diamond face" },
    ],
  },
  {
    name: "hair",
    label: "发型",
    colored: true,
    selectValues: [
      { key: "高马尾", value: "high ponytail" },
      { key: "低马尾", value: "low ponytail" },
      { key: "双马尾", value: "twin tails" },
      { key: "直发", value: "" },
      { key: "刘海", value: "bangs" },
    ],
  },
  {
    name: "hair_length",
    label: "头发长度",
    selectValues: [
      { key: "短发", value: "short hair" },
      { key: "长发", value: "long hair" },
      { key: "中发", value: "medium hair" },
    ],
  },
  {
    name: "eyes",
    label: "眼睛",
    colored: true,
    selectValues: [
      { key: "细节", value: "details eyes" },
      { key: "眼妆", value: "exquisite eye makeup" },
    ],
  },
  {
    name: "tips",
    label: "嘴唇",
    colored: true,
    selectValues: [
      { key: "细节", value: "details lips" },
      { key: "口红", value: "lipstick" },
    ],
  },
  {
    name: "breasts",
    label: "胸部",
    selectValues: [
      { key: "巨大", value: "huge breasts" },
      { key: "大", value: "large breasts" },
      { key: "中等", value: "medium breasts" },
      { key: "小", value: "small breasts" },
      { key: "微小", value: "tiny breasts" },
    ],
  },
  {
    name: "waist",
    label: "腰部",
    selectValues: [
      { value: "large waist", key: "粗腰" },
      { value: "medium waist", key: "中等腰" },
      { value: "slim waist", key: "细腰" },
    ],
  },
  {
    name: "legs",
    label: "腿部",
    selectValues: [
      { value: "thick thighs", key: "粗腿" },
      { value: "medium thighs", key: "中等腿" },
      { value: "slim thighs", key: "细腿" },
    ],
  },
  {
    name: "feet",
    label: "脚部",
    selectValues: [],
  },
];

const sdCommonPrompts: SdPromptField[] = [
  {
    name: "quality",
    label: "通用质量",
    selectValues: [
      {
        key: "高质量",
        value: "masterpiece, best quality, highres, ultra high res",
      },
    ],
  },
  {
    name: "style",
    label: "风格",
    selectValues: [
      { key: "动漫", value: "anime" },
      { key: "照片", value: "real, photorealistic" },
      { key: "卡通", value: "cartoon" },
    ],
  },
  {
    name: "person",
    label: "人物",
    selectValues: [
      { key: "1个女孩", value: "1 girl" },
      { key: "1个男孩", value: "1 boy" },
      { key: "1个女性", value: "1 female" },
      { key: "1个男性", value: "1 male" },
      { key: "双胞胎女孩", value: "twin girls" },
      { key: "双胞胎男孩", value: "twin boys" },
      { key: "龙凤胎", value: "twins one boy and one girl" },
    ],
  },
  {
    name: "time",
    label: "时间",
    selectValues: [
      { key: "早上", value: "morning" },
      { key: "下午", value: "afternoon" },
      { key: "傍晚", value: "evening" },
      { key: "晚上", value: "night" },
    ],
  },
  {
    name: "light",
    label: "光线",
    selectValues: [
      { key: "自然光", value: "natural lighting" },
      { key: "电影灯光", value: "cinematic lighting" },
      { key: "人造光", value: "artificial lighting" },
      { key: "丁达尔效果", value: "Tyndall effect" },
      { key: "侧光", value: "side light" },
      { key: "顶光", value: "top light" },
      { key: "逆光", value: "backlight" },
    ],
  },
  {
    name: "camera_angle",
    label: "镜头角度",
    selectValues: [
      { key: "正面", value: "looking at viewer" },
      { key: "侧面", value: "looking sideways" },
      { key: "背面", value: "back of person" },
    ],
  },
  {
    name: "scene",
    label: "场景",
    selectValues: [
      { key: "室内", value: "indoor" },
      { key: "室外", value: "outdoor" },
    ],
  },
  {
    name: "shot_types",
    label: "景别",
    selectValues: [
      { key: "全身", value: "full body" },
      { key: "半身", value: "half body" },
      { key: "上半身", value: "upper body" },
      { key: "下半身", value: "lower body" },
      { key: "特写", value: "close up" },
      { key: "近景", value: "close shot" },
      { key: "中景", value: "medium shot" },
      { key: "全景", value: "panoramic" },
      { key: "远景", value: "vision" },
    ],
  },
];

const sdPersonPromptFields: SdPromptField[] = [
  {
    name: "head",
    label: "头部",
    colored: true,
    selectValues: [
      { value: "headband", key: "头饰" },
      { value: "hair accessory", key: "发饰" },
      { value: "hair ornament", key: "发饰" },
      { value: "hairpin", key: "簪" },
      { value: "hat", key: "帽子" },
      { value: "choker", key: "项圈" },
    ],
  },
  {
    name: "expression",
    label: "情绪",
    selectValues: [
      { key: "微笑", value: "smile" },
      { key: "开心", value: "happy" },
      { key: "大笑", value: "laughing" },
      { key: "沮丧", value: "depressed" },
      { key: "冷漠", value: "indifferent" },
      { key: "痛苦", value: "pain" },
      { key: "亲吻", value: "kissing" },
    ],
  },
  {
    name: "action",
    label: "动作",
    selectValues: [
      { key: "双手背后", value: "arms behind back" },
      { key: "跳舞", value: "dancing" },
      { key: "喝酒", value: "drinking" },
      { key: "吃饭", value: "eating" },
      { key: "跌倒", value: "falling down" },
      { key: "飞行", value: "flying" },
      { key: "拥抱", value: "hugging" },
      { key: "跳跃", value: "jumping" },
      { key: "踢", value: "kicking" },
      { key: "躺下", value: "lying down" },
      { key: "躺在背上", value: "lying on back" },
      { key: "躺在侧面", value: "lying on side" },
      { key: "躺在肚子上", value: "lying on stomach" },
      { key: "躺在地上", value: "lying on ground" },
    ],
  },
  {
    name: "clothes_styles",
    label: "服饰风格",
    selectValues: [
      { key: "中国风", value: "chinese clothes style" },
      { key: "日本风", value: "japanese clothes style" },
      { key: "洛丽塔", value: "lolita" },
    ],
  },
  {
    name: "upper_clothes",
    label: "上半身服饰",
    colored: true,
    selectValues: [
      { key: "T恤", value: "tshirt" },
      { key: "衬衫", value: "shirt" },
      { key: "女衬衫", value: "blouse" },
      { key: "毛衣", value: "sweater" },
      { key: "夹克", value: "jacket" },
      { key: "外套", value: "coat" },
      { key: "连衣裙", value: "dress" },
      { key: "长袍", value: "robe" },
      { key: "和服", value: "kimono" },
      { key: "西装", value: "suit" },
      { key: "马甲", value: "vest" },
      { key: "大衣", value: "overcoat" },
      { key: "斗篷", value: "cape" },
      { key: "披肩", value: "poncho" },
      { key: "围裙", value: "apron" },
      { key: "制服", value: "uniform" },
      { key: "Bra", value: "bra" },
      { key: "比基尼", value: "bikini" },
      { key: "泳装", value: "swimsuit" },
      { key: "内衣", value: "lingerie" },
      { key: "睡衣", value: "pajamas" },
      { key: "浴巾", value: "towel" },
      { key: "内衣", value: "underwear" },
    ],
  },
  {
    name: "lower_clothes",
    label: "下半身服饰",
    colored: true,
    selectValues: [
      { key: "丝袜", value: "stockings" },
      { key: "黑丝", value: "black stockings" },
      { key: "牛仔裤", value: "jeans" },
      { key: "长裤", value: "pants" },
      { key: "短裤", value: "shorts" },
      { key: "阔腿裤", value: "Wide leg pants" },
      { key: "裙子", value: "skirt" },
      { key: "长裙", value: "long skirt" },
      { key: "百褶裙", value: "pleated skirt" },
    ],
  },
];

const sdOtherPromptFields: SdPromptField[] = [
  {
    name: "background",
    label: "背景",
    selectValues: [
      { key: "天空", value: "sky" },
      { key: "森林", value: "forest" },
      { key: "草地", value: "grassland" },
      { key: "山", value: "mountain" },
      { key: "城市", value: "city" },
      { key: "海滩", value: "beach" },
      { key: "水", value: "water" },
      { key: "沙漠", value: "desert" },
      { key: "雪", value: "snow" },
      { key: "洞穴", value: "cave" },
      { key: "太空", value: "space" },
    ],
  },
  {
    name: "plant",
    label: "植物",
    selectValues: [
      { key: "花", value: "flower" },
      { key: "桃花", value: "peach blossom tree" },
      { key: "樱花", value: "cherry blossom tree" },
      { key: "花瓣", value: "blossom" },
      { key: "叶子", value: "leaf" },
      { key: "草", value: "grass" },
      { key: "树", value: "tree" },
      { key: "灌木", value: "bush" },
      { key: "仙人掌", value: "cactus" },
      { key: "竹子", value: "bamboo" },
      { key: "松树", value: "pine tree" },
      { key: "松果", value: "pinecone" },
    ],
  },
];

let fields = [...sdDetailedPromptFields, ...sdPersonPromptFields, ...sdCommonPrompts];
const generateEmptyForm = () =>
  fields.reduce((acc: any, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
const sdGeneratorFormStorage = new WebStorage<Record<string, string>>("sdGeneratorForm");
const copyToClipboard = (text: string) => {
  const textarea = document.createElement("textarea");
  // prevent mobile device popup keyboard
  textarea.setAttribute("readonly", "readonly");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

function StableDiffusionGenerator() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [huggingFace, setHuggingFace] = useState({
    image: "",
    loading: false,
    error: "",
    prompt: ""
  });
  const promptResultRef = useRef<HTMLDivElement | null>(null);

  const formik = useFormik({
    initialValues: generateEmptyForm(),
    onSubmit: (values) => {
      sdGeneratorFormStorage.set(values);
      copyToClipboard(promptResultRef.current?.innerText ?? "");
    },
  });

  const text = useMemo(() => {
    let values = formik.values;
    const filteredValues = Object.keys(values).reduce((acc: any, key) => {
      if (values[key] !== "") acc[key] = values[key];
      return acc;
    }, {});

    return flatten(Object.values<string>(filteredValues).map((it) => it.split(",").map((it) => it.trim()))).join(", ");
  }, [formik.values]);

  useEffect(() => {
    const formStorage = sdGeneratorFormStorage.get();
    if (formStorage) formik.setValues(formStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClear = () => {
    sdGeneratorFormStorage.remove();
    formik.setValues(generateEmptyForm());
  };

  const [lazyText, setLazyText] = useState("");
  const handleChange = (event: any) => setLazyText(event.target.value);
  const toGptTemplate = (text: string) => `我在用 NovelAI 画画，我的场景是：${text}，结果需要转为 tag 格式。要求如下：
第一步：请用 100 字左右中文描述这个场景。
第二步：将场景内所有元素及其关系和描述词，都用 tag 描述。tag 的数量不限，但是请尽量详细。
第三步：tag 使用英文描述。
第四步：输出完整的 tag，使用 , 分隔，如 """realistic and delicate facial features, long hair, and a white dress"""。

格式如下：

"""
第一步 - 场景：{}
第二步 - 标签（关系词、名词、动词）：{}
第三步 - tag：{}
第四步： {}
"""

`;

  return (
    <SimpleGrid spacing={10}>
      <Heading as={"h3"}>方式 一：ChatGPT 生成 Tag</Heading>
      <InputGroup size='lg'>
        <Input placeholder={"懒人模式，输入你的场景"} value={lazyText} onChange={handleChange} />
        <InputRightElement width='6rem'>
          <Stack spacing={2} direction='row' align='center'>
            <CopyComponent value={toGptTemplate(lazyText)} />
            <ClickPromptButton size={"sm"} text={toGptTemplate(lazyText)} />
          </Stack>
        </InputRightElement>
      </InputGroup>
      <Heading as={"h3"}>方式 二：手动画人</Heading>
      <form onSubmit={formik.handleSubmit}>
        <SimpleGrid gap={3} p={3} columns={8}>
          {sdCommonPrompts.map((field) => PromptFieldForm({ field, formik }))}
        </SimpleGrid>

        <Flex alignItems='start' gap='2'>
          <Grid>
            <Text>人物</Text>
            <SimpleGrid gap={3} p={3} columns={2}>
              {sdPersonPromptFields.map((field) => PromptFieldForm({ field, formik }))}
            </SimpleGrid>

            <Text>其他</Text>
            <SimpleGrid gap={3} p={3} columns={2}>
              {sdOtherPromptFields.map((field) => PromptFieldForm({ field, formik }))}
            </SimpleGrid>
          </Grid>

          <Image src={sdImage} alt='stable-diffusion-demo' />

          <Grid>
            <Text>身体</Text>
            <SimpleGrid gap={3} p={3} columns={2}>
              {sdDetailedPromptFields.map((field) => PromptFieldForm({ field, formik }))}
            </SimpleGrid>
          </Grid>
        </Flex>

        <Text ref={promptResultRef}>{text}</Text>

        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          复制咒语并保存
        </Button>
        <Button mt={4} marginLeft={1} isLoading={isSubmitting} onClick={onClear}>
          清除缓存
        </Button>
      </form>
      <Heading as={"h3"}>在线测试咒语</Heading>
      <SimpleGrid gap={3} p={3} columns={1}>
          <Link href={"https://lexica.art/"} isExternal>
            Lexica
          </Link>
        </SimpleGrid>
      <Flex alignItems='start' gap='2'>
        <HuggingFaceText2Img model="stabilityai/stable-diffusion-2-1-base" prompt={promptResultRef.current?.innerText ?? ""} />
        <HuggingFaceText2Img model="andite/anything-v4.0" prompt={promptResultRef.current?.innerText ?? ""} />
        <HuggingFaceText2Img model="prompthero/openjourney" prompt={promptResultRef.current?.innerText ?? ""} />
      </Flex>
    </SimpleGrid>
  );
}

export default StableDiffusionGenerator;

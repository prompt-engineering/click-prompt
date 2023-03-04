import React, { ChangeEventHandler } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import sdImage from "@/assets/stable-diffusion-demo.jpeg";
import Image from "next/image";
// @ts-ignore
import { MaterialPicker } from "react-color";
import CopyComponent from "@/components/CopyComponent";
import SimpleColorPicker from "@/components/SimpleColorPicker";

type SdPromptField = {
  name: string;
  label: string;

  colored?: boolean;

  selectValues: SelectValue[];

  children?: SdPromptField[];
};

type SelectValue = {
  key: string;
  value: string;
};

const sdDetailedPromptFields: SdPromptField[] = [
  {
    name: "hair",
    label: "发型",
    colored: true,
    selectValues: [
      { key: "长发", value: "Long Hair" },
      { key: "短发", value: "Short Hair" },
      { key: "中发", value: "Medium Hair" },
      { key: "高马尾", value: "High Ponytail" },
      { key: "低马尾", value: "Low Ponytail" },
      { key: "双马尾", value: "Twin Tails" },
    ],
  },
  {
    name: "eyes",
    label: "眼睛",
    colored: true,
    selectValues: [{ key: "细节", value: "Details eyes" }],
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
    name: "tips",
    label: "嘴唇",
    colored: true,
    selectValues: [
      {
        key: "嘴唇",
        value: "lips",
      },
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
        value: "masterpiece, best quality, highres",
      },
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
      { key: "白天", value: "daylight" },
      { key: "夜晚", value: "night" },
      { key: "室内", value: "indoor" },
      { value: "cinematic lighting", key: "电影灯光" },
      { value: "natural lighting", key: "自然光" },
      { value: "artificial lighting", key: "人造光" },
    ],
  },
  {
    name: "camera",
    label: "镜头",
    selectValues: [
      { key: "正对", value: "looking at viewer" },
      { key: "侧面", value: "looking sideways" },
      { key: "背面", value: "looking away" },
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
    name: "plant",
    label: "植物",
    selectValues: [
      { key: "花", value: "flower" },
      { key: "桃花", value: "peach blossom" },
      { key: "樱花", value: "cherry blossom" },
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

const sdPersonPromptFields: SdPromptField[] = [
  {
    name: "head",
    label: "头部",
    selectValues: [
      { value: "headband", key: "头饰" },
      { value: "hair accessory", key: "发饰" },
      { value: "hair ornament", key: "发饰" },
      { value: "hairpin", key: "簪" },
    ],
  },
  {
    name: "body",
    label: "全身/半身",
    selectValues: [
      { key: "全身", value: "full body" },
      { key: "半身", value: "half body" },
      { key: "上半身", value: "upper body" },
      { key: "下半身", value: "lower body" },
    ],
  },
  {
    name: "clothes_styles",
    label: "服饰风格",
    selectValues: [
      { key: "中国风", value: "Chinese Style" },
      { key: "日本风", value: "Japanese Style" },
    ],
  },
  {
    name: "upper_clothes",
    label: "上半身服饰",
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
      // bra, bikini, swimsuit, lingerie, pajamas, robe, towel, underwear, other
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
    selectValues: [
      { key: "丝袜", value: "stockings" },
      { key: "黑丝", value: "black stockings" },
      { key: "牛仔裤", value: "jeans" },
      { key: "长裤", value: "pants" },
      { key: "短裤", value: "shorts" },
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
      { key: "亲吻", value: "kissing" },
      { key: "笑", value: "laughing" },
      { key: "躺下", value: "lying down" },
      { key: "躺在背上", value: "lying on back" },
      { key: "躺在侧面", value: "lying on side" },
      { key: "躺在肚子上", value: "lying on stomach" },
      { key: "躺在地上", value: "lying on ground" },
    ],
  },
  {
    name: "background",
    label: "背景",
    selectValues: [
      { key: "天空", value: "sky" },
      { key: "森林", value: "forest" },
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
];

function promptFieldForm(field: SdPromptField) {
  return (
    <FormControl key={field.name} id={field.name} mt={2}>
      <FormLabel>
        {field.label} {field.colored && <SimpleColorPicker />}{" "}
      </FormLabel>
      <Select name={field.name} placeholder={`Select ${field.label}`}>
        {field.selectValues.map((select, index) => (
          <option key={field.name + "-" + index} value={select.value}>
            {select.key}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

function StableDiffusionGenerator() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [text, setText] = React.useState("");

  let fields = sdDetailedPromptFields.concat(sdPersonPromptFields);
  fields = fields.concat(sdCommonPrompts);

  const formik = useFormik({
    initialValues: fields.reduce((acc: any, field) => {
      acc[field.name] = "";
      return acc;
    }, {}),
    onSubmit: (values) => {
      const filteredValues = Object.keys(values).reduce((acc: any, key) => {
        if (values[key] !== "") {
          acc[key] = values[key];
        }
        return acc;
      }, {});

      const prompt = Object.values(filteredValues).join(",");
      setText(prompt);
    },
  });

  console.log(formik.initialValues);

  const [lazyText, setLazyText] = React.useState("");
  const handleChange = (event: any) => setLazyText(event.target.value);
  const toGptTemplate = (
    text: string,
  ) => `我在用 NovelAI 画画，我的场景是：${text}，结果需要转为 tag 格式。要求如下：
第一步：请用 100 字左右中文描述这个场景。
第二步：将场景内所有元素及其关系和描述词，都用 tag 描述。tag 的数量不限，但是请尽量详细。每个 tag 不超五个单词，用逗号分隔。   
第三步：tag 使用英文描述。

格式如下：

"""
第一步 - 场景：{}
第二步 - 标签（关系词、名词、动词）：{}
第三步 - tag：{}
"""

"""
`;

  return (
    <SimpleGrid spacing={10}>
      <Heading as={"h3"}>方式 一：ChatGPT 生成 Tag</Heading>
      <InputGroup size='lg'>
        <Input
          placeholder={"懒人模式，输入你的场景"}
          value={lazyText}
          onChange={handleChange}
        />
        <InputRightElement width='4.5rem'>
          <CopyComponent value={toGptTemplate(lazyText)} />
        </InputRightElement>
      </InputGroup>
      <Heading as={"h3"}>方式 二：手动画人</Heading>
      <form onSubmit={formik.handleSubmit}>
        <SimpleGrid gap={3} p={3} columns={6}>
          {sdCommonPrompts.map((field) => promptFieldForm(field))}
        </SimpleGrid>

        <Flex alignItems='start' gap='2'>
          <Grid>
            <Text>人物</Text>
            <SimpleGrid gap={3} p={3} columns={2}>
              {sdPersonPromptFields.map((field) => promptFieldForm(field))}
            </SimpleGrid>
          </Grid>

          <Image src={sdImage} alt='stable-diffusion-demo' />

          <Grid>
            <Text>身体</Text>
            <SimpleGrid gap={3} p={3} columns={2}>
              {sdDetailedPromptFields.map((field) => promptFieldForm(field))}
            </SimpleGrid>
          </Grid>
        </Flex>

        <Text> {text}</Text>

        <Button
          mt={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'
        >
          创造
        </Button>
      </form>

      <Heading as={"h3"}>画xx（Todo）</Heading>
    </SimpleGrid>
  );
}

export default StableDiffusionGenerator;

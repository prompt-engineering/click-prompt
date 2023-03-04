import React from 'react'
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel, Grid, Heading,
  Select,
  SimpleGrid,
  Text
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import sdImage from '@/assets/stable-diffusion-demo.jpeg'
import Image from 'next/image'
import { MaterialPicker } from 'react-color'

type SdPromptField = {
  name: string;
  label: string;

  colored?: boolean;

  selectValues: string[];

  children?: SdPromptField[];
};

const sdDetailedPromptFields: SdPromptField[] = [
  {
    name: 'hair',
    label: '头发',
    colored: true,
    selectValues: ['Long', 'Short', 'Bald']
  },
  {
    name: 'eyes',
    label: '眼睛',
    colored: true,
    selectValues: ['Normal', 'Black', 'Red']
  },
  {
    name: 'face',
    label: '脸型',
    selectValues: ['Normal', 'Round', 'Square']
  },
  {
    name: '嘴唇',
    label: 'tips',
    colored: true,
    selectValues: ['colored']
  },
  {
    name: 'chest',
    label: '胸部',
    selectValues: ['huge', 'large', 'medium', 'small', 'tiny']
  },
  {
    name: 'waist',
    label: '腰部',
    selectValues: ['large waist', 'medium medium', 'slim waist']
  },
  {
    name: 'legs',
    label: '腿部',
    selectValues: ['Normal', 'Large', 'Small']
  },
  {
    name: 'feet',
    label: '脚部',
    selectValues: ['Normal', 'Large', 'Small']
  }
]

const sdCommonPrompts: SdPromptField[] = [
  {
    name: 'quality',
    label: '通用质量',
    selectValues: ['masterpiece, best quality, highres', 'High']
  },
  {
    name: 'time',
    label: '时间',
    selectValues: ['Morning', 'Afternoon', 'Evening', 'Night']
  },
  {
    name: 'light',
    label: '光线',
    selectValues: ['Daylight', 'Night', 'Indoor']
  },
  {
    name: 'camera',
    label: '镜头',
    selectValues: ['looking at viewer', 'looking sideways', 'looking away']
  },
  {
    name: 'scene',
    label: '场景',
    selectValues: ['outdoor', 'indoor']
  },
  {
    name: 'plant',
    label: '植物',
    selectValues: ['none', 'tree', 'flower', 'peach blossom', 'other']
  }
]

const sdPersonPromptFields: SdPromptField[] = [
  {
    name: 'head',
    label: '头部',
    selectValues: ['Front', 'Back', 'Side']
  },
  {
    name: 'body',
    label: '全身/半身',
    selectValues: ['Front', 'Back', 'Side']
  },
  {
    name: 'clothes_styles',
    label: '服饰风格',
    selectValues: ['Chinese Style', 'Back', 'Side']
  },
  {
    name: 'upper_clothes',
    label: '上半身服饰',
    selectValues: ['Chinese Style', 'Back', 'Side']
  },
  {
    name: 'lower_clothes',
    label: '下半身服饰',
    selectValues: ['Front', 'Back', 'Side']
  },
  {
    name: 'action',
    label: '动作',
    selectValues: ['arms behind back', 'Back', 'Side']
  },
  {
    name: 'background',
    label: '背景',
    selectValues: ['sky', 'forest', 'mountain', 'city', 'beach', 'water', 'desert', 'snow', 'cave', 'space', 'other']
  }
]

function StableDiffusionGenerator() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  return (
    <SimpleGrid spacing={ 10 }>
      <Heading as={ 'h3' }>画人</Heading>
      <Formik
        initialValues={ { quality: 'Normal' } }
        onSubmit={ (values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        } }
      >
        <Form>
          <SimpleGrid gap={ 3 } p={ 3 } columns={ 5 }>
            { sdCommonPrompts.map((field) => (
              <FormControl key={ field.name } id={ field.name } mt={ 2 }>
                <FormLabel>{ field.label }</FormLabel>
                <Select name={ field.name } placeholder={ `Select ${ field.label }` }>
                  { field.selectValues.map((value) => (
                    <option key={ value } value={ value }>
                      { value }
                    </option>
                  )) }
                </Select>
              </FormControl>
            )) }
          </SimpleGrid>

          <Flex alignItems='start' gap='2'>
            <Grid>
              <Text>人物</Text>
              <SimpleGrid gap={ 3 } p={ 3 } columns={ 2 }>
                { sdPersonPromptFields.map((field) => (
                  <FormControl key={ field.name } id={ field.name } mt={ 2 }>
                    <FormLabel>{ field.label }</FormLabel>
                    <Select name={ field.name } placeholder={ `Select ${ field.label }` }>
                      { field.selectValues.map((value) => (
                        <option key={ value } value={ value }>
                          { value }
                        </option>
                      )) }
                    </Select>
                  </FormControl>
                )) }

              </SimpleGrid>
            </Grid>

            <Image src={ sdImage } alt='stable-diffusion-demo' />

            <Grid>
              <Text>身体</Text>
              <SimpleGrid gap={ 3 } p={ 3 } columns={ 2 }>
                { sdDetailedPromptFields.map((field) => (
                  <FormControl key={ field.name } id={ field.name } mt={ 2 }>
                    <FormLabel>{ field.label }</FormLabel>
                    { field.colored && <MaterialPicker /> }

                    <Select name={ field.name } placeholder={ `Select ${ field.label }` }>
                      { field.selectValues.map((value) => (
                        <option key={ value } value={ value }>
                          { value }
                        </option>
                      )) }
                    </Select>
                  </FormControl>
                )) }
              </SimpleGrid>
            </Grid>
          </Flex>

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

          <Button
            mt={ 4 }
            colorScheme='teal'
            isLoading={ isSubmitting }
            type='submit'
          >
            创造
          </Button>
        </Form>
      </Formik>

      <Heading as={ 'h3' }>画xx（Todo）</Heading>
    </SimpleGrid>
  )
}

export default StableDiffusionGenerator

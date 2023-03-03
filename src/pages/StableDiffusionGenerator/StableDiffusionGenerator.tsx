import React from 'react'
import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react'
import { Form, Formik } from 'formik'

type SdPromptField = {
  name: string
  label: string
  selectValues: string[]
}

/* FormControl: 通用质量,光线,镜头,头部,场景,身体,服饰,动作,背景 */
const sdPromptFields: SdPromptField[] = [
  {
    name: 'quality',
    label: '通用质量',
    selectValues: ['Normal', 'High']
  },
  {
    name: 'light',
    label: '光线',
    selectValues: ['Daylight', 'Night', 'Indoor']
  },
  {
    name: 'camera',
    label: '镜头',
    selectValues: ['Front', 'Back', 'Side']
  },
  {
    name: 'head',
    label: '头部',
    selectValues: ['Front', 'Back', 'Side']
  },
  {
    name: 'scene',
    label: '场景',
    selectValues: ['Front', 'Back', 'Side']
  },
  {
    name: 'body',
    label: '身体',
    selectValues: ['Front', 'Back', 'Side']
  },
  {
    name: 'clothes',
    label: '服饰',
    selectValues: ['Front', 'Back', 'Side']
  },
  {
    name: 'action',
    label: '动作',
    selectValues: ['Front', 'Back', 'Side']
  },
  {
    name: 'background',
    label: '背景',
    selectValues: ['Front', 'Back', 'Side']
  }
]

function StableDiffusionGenerator() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  return (
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
        { sdPromptFields.map((field) => (
          <FormControl key={ field.name } id={ field.name } mt={ 4 }>
            <FormLabel>{ field.label }</FormLabel>
            <Select
              name={ field.name }
              placeholder={ `Select ${ field.label }` }
            >
              { field.selectValues.map((value) => (
                <option key={ value } value={ value }>
                  { value }
                </option>
              )) }
            </Select>
          </FormControl>
        )) }
        <Button
          mt={ 4 }
          colorScheme='teal'
          isLoading={ isSubmitting }
          type='submit'
        >
          Generator
        </Button>
      </Form>
    </Formik>
  )
}

export default StableDiffusionGenerator

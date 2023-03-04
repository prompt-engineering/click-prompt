import React, { useState } from 'react'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import SimpleColorPicker from '@/components/SimpleColorPicker'
import { FormikProps } from 'formik'

type SelectValue = {
  key: string;
  value: string;
}

export type SdPromptField = {
  name: string;
  label: string;

  colored?: boolean;

  selectValues: SelectValue[];

  children?: SdPromptField[];
};

type FieldFormProp = {
  field: SdPromptField;
  formik: FormikProps<any>;
}

export function PromptFieldForm(props: FieldFormProp) {
  const { field, formik } = props
  const [colorName, setColorName] = useState('')

  return <FormControl key={ field.name } id={ field.name } mt={ 2 }>
    <FormLabel>
      { field.label } { field.colored && <SimpleColorPicker /> }
    </FormLabel>

    <Select name={ field.name }
            placeholder={ `Select ${ field.label }` }
            onChange={ formik.handleChange }>
      { field.selectValues.map((select, index) => (
        <option key={ field.name + '-' + index } value={ select.value }>
          { select.key }
        </option>
      )) }
    </Select>
  </FormControl>
}

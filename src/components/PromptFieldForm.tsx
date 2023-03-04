import React, { useState } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import SimpleColorPicker, { ColorType } from "@/components/SimpleColorPicker";
import { FormikProps } from "formik";
import { debounce } from "lodash-es";

export type SelectValue = {
  key: string;
  value: string;
};

export type SdPromptField = {
  name: string;
  label: string;

  colored?: boolean;

  selectValues: SelectValue[];

  children?: SdPromptField[];
};

export type FieldFormProp = {
  field: SdPromptField;
  formik: FormikProps<any>;
};

function PromptFieldForm(props: FieldFormProp) {
  const { field, formik } = props;
  const [color, setColor] = useState("");
  const [value, setValue] = useState("");

  if (!field) return null;
  const onColorChange = debounce((color: string) => {
    setColor(color);
    if (value) formik.setFieldValue(field.name, `${color} ${value}`);
  }, 100);

  return (
    <FormControl key={field.name} id={field.name} mt={2}>
      <FormLabel>
        {field.label} {field.colored && <SimpleColorPicker colorType={ColorType.Normal} updateColor={onColorChange} />}
      </FormLabel>

      <Select
        name={field.name}
        placeholder={`-`}
        onChange={(event) => {
          setValue(event.target.value);
          const value = color ? `${color} ${event.target.value}` : event.target.value;
          formik.setFieldValue(field.name, value);
        }}
      >
        {field.selectValues.map((select, index) => (
          <option key={field.name + "-" + index} value={select.value}>
            {select.key}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default PromptFieldForm;

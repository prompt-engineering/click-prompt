import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fieldValue = formik.values[field.name]?.value?.split(" color ") ?? [];
    let initValue,
      initColor = "";
    if (fieldValue.length > 1) [initColor, initValue] = fieldValue;
    else [initValue = ""] = fieldValue;
    setColor(initColor ? `${initColor} color` : "");
    setValue(initValue);
  }, [formik.values[field.name]]);

  if (!field) return null;
  const onColorChange = debounce((color: string) => {
    setColor(color);
    if (value) formik.setFieldValue(field.name, { value: `${color} ${value}`, weight: 0, ratio: 1 });
  }, 100);

  return (
    <FormControl key={field.name} id={field.name} mt={2}>
      <FormLabel>
        {field.label}{" "}
        {field.colored && (
          <SimpleColorPicker initColor={color} colorType={ColorType.Normal} updateColor={onColorChange} />
        )}
      </FormLabel>

      <Select
        name={field.name}
        value={value}
        placeholder={`-`}
        onChange={(event) => {
          const inputValue = event.target.value;
          setValue(inputValue);
          if (inputValue) {
            const value = color ? `${color} ${inputValue}` : inputValue;
            formik.setFieldValue(field.name, { value, weight: 0, ratio: 1 });
          } else {
            setColor("");
            formik.setFieldValue(field.name, { value: "", weight: 0, ratio: 1 });
          }
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

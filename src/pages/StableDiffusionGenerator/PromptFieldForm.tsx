import React, { useState } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import SimpleColorPicker, { ColorType } from "@/components/SimpleColorPicker";
import { FormikProps } from "formik";

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

  return (
    <>
      {field && (
        <FormControl key={field.name} id={field.name} mt={2}>
          <FormLabel>
            {field.label}{" "}
            {field.colored && (
              <SimpleColorPicker colorType={ColorType.Normal} updateColor={(color) => setColor(color)} />
            )}
          </FormLabel>

          <Select
            name={field.name}
            placeholder={`Select ${field.label}`}
            onChange={(event) => {
              console.log(color);
              if (color !== "") {
                formik.setFieldValue(field.name, `${color} ${event.target.value}`);
              } else {
                formik.setFieldValue(field.name, event.target.value);
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
      )}
    </>
  );
}

export default PromptFieldForm;

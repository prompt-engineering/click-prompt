import React, { Fragment } from "react";
import { AuthKeyValues, FlowAction } from "@/flows/types/flow-action";
import { Button, FormControl, Grid, Input } from "@chakra-ui/react";
import { preActionDispatcher } from "../pre-action-dispatcher";
import { parseConfigures } from "@/flows/components/SettingHeaderConfig";
import { Form, Formik, useFormik } from "formik";

type ActionProps = { action: FlowAction; onResponse?: (value: any) => void };

function PreFlowAction({ action }: ActionProps) {
  let conf: AuthKeyValues = [];
  if (action.api?.headers) {
    conf = parseConfigures(action.api?.headers);
  }

  const formik = useFormik({
    initialValues: conf.reduce((acc: any, field) => {
      acc[field.key] = field.value;
      return acc;
    }, {}),
    onSubmit: (values) => {
      if (conf.length > 0 && action.api?.headers) {
        action.api!.headers.map((header) => {
          if (values[header.key]) {
            header.value = values[header.key];
          }
        });
      }

      console.log(action);
      preActionDispatcher(action).then((r) => console.log(r));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid gap={6} alignItems='end'>
        {conf.length > 0 &&
          conf.map((keyValue, index) => (
            <Fragment key={index}>
              <FormControl key={keyValue.key} id={keyValue.key} mt={4}>
                <label htmlFor={keyValue.key}>{keyValue.key}</label>
                <Input
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    formik.setFieldValue(keyValue.key, inputValue);
                  }}
                />
              </FormControl>
            </Fragment>
          ))}

        <Button colorScheme='twitter' className='bg-blue' type='submit'>
          {action.name}
        </Button>
      </Grid>
    </form>
  );
}

export default PreFlowAction;

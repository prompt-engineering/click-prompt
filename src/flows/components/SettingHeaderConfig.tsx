import React from "react";
import { AuthKeyValues } from "@/flows/types/flow-action";

export function parseConfigures(values: AuthKeyValues): AuthKeyValues {
  const regex = /\${{.*}}/g;
  const configures = values
    .map((v) => {
      const match = v.value.match(regex);
      if (match) {
        return {
          key: v.key,
          value: match[0],
        };
      }
    })
    .filter((v) => v != undefined);

  return configures as AuthKeyValues;
}

type ConfigProps = {
  configures: AuthKeyValues;
};

function SettingHeaderConfig(props: ConfigProps) {
  return <div></div>;
}

export default SettingHeaderConfig;

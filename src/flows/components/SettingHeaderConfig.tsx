import React from "react";

type AuthKeyValues = {
  key: string;
  value: string;
}[];

export function parseConfigures(values: AuthKeyValues) {
  const regex = /\${{.*}}/g;
  const configures = values.map((v) => {
    const match = v.value.match(regex);
    if (match) {
      return {
        key: v.key,
        value: match[0],
      };
    }
  });

  return configures;
}

type ConfigProps = {
  configures: AuthKeyValues;
};

function SettingHeaderConfig(props: ConfigProps) {
  return <div></div>;
}

export default SettingHeaderConfig;

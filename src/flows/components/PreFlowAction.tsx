import React from "react";
import { AuthKeyValues, FlowAction } from "@/flows/types/flow-action";
import { Button } from "@chakra-ui/react";
import { preActionDispatcher } from "../pre-action-dispatcher";
import { parseConfigures } from "@/flows/components/SettingHeaderConfig";

type ActionProps = { action: FlowAction; onResponse?: (value: any) => void };

function PreFlowAction({ action }: ActionProps) {
  let configures: AuthKeyValues = [];
  if (action.api?.headers) {
    configures = parseConfigures(action.api?.headers);
  }

  const clickButton = () => {
    preActionDispatcher(action).then((r) => console.log(r));
  };

  return (
    <div>
      {configures.length > 0 &&
        configures.map((c) => {
          return <></>;
        })}
      <Button colorScheme='twitter' className='bg-blue' onClick={clickButton}>
        {action.name}
      </Button>
    </div>
  );
}

export default PreFlowAction;

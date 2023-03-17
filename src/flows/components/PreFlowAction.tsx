import React from "react";
import { FlowAction } from "@/flows/types/flow-action";
import { Button } from "@chakra-ui/react";
import { preActionDispatcher } from "../pre-action-dispatcher";

type ActionProps = { action: FlowAction; onResponse?: (value: any) => void };

function PreFlowAction({ action }: ActionProps) {
  const clickButton = () => {
    preActionDispatcher(action).then((r) => console.log(r));
  };

  return (
    <div>
      <Button colorScheme='twitter' className='bg-blue' onClick={clickButton}>
        {action.name}
      </Button>
    </div>
  );
}

export default PreFlowAction;

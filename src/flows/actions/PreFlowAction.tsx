import React from "react";
import { FlowAction } from "@/flows/types/flow-action";
import { Button } from "@chakra-ui/react";
import { actionDispatcher } from "@/flows/action-dispatcher";

type ActionProps = { action: FlowAction };

function PreFlowAction({ action }: ActionProps) {
  const clickButton = () => {
    console.log("click button");
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

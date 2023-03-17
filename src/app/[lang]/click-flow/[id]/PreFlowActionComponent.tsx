import React from "react";
import { FlowAction } from "@/app/[lang]/click-flow/[id]/flow-action";
import { Button } from "@chakra-ui/react";
import { actionDispatcher } from "@/app/[lang]/click-flow/[id]/action-dispatcher";

type ActionProps = { action: FlowAction };

function PreFlowActionComponent({ action }: ActionProps) {
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

export default PreFlowActionComponent;

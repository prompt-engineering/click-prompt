import React from "react";
import { FlowAction } from "@/app/[lang]/click-flow/[id]/flow-action";
import { Button } from "@chakra-ui/react";
import { actionDispatcher } from "@/app/[lang]/click-flow/[id]/action-dispatcher";

type ActionProps = { action: FlowAction; response: string };

function FlowActionComponent({ action, response }: ActionProps) {
  const gptResponse = response;
  const clickButton = () => {
    actionDispatcher(action, gptResponse).then((r) => console.log(r));
  };

  return (
    <div>
      <Button colorScheme='twitter' className='bg-blue' onClick={clickButton}>
        {action.name}
      </Button>
    </div>
  );
}

export default FlowActionComponent;

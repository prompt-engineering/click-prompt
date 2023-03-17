import React from "react";
import { FlowAction } from "@/flows/action/flow-action";
import { Button } from "@chakra-ui/react";
import { actionDispatcher } from "@/flows/action/action-dispatcher";

type ActionProps = { action: FlowAction; response: string };

function PostFlowActionComponent({ action, response }: ActionProps) {
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

export default PostFlowActionComponent;

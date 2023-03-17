import React from "react";
import { FlowAction } from "@/flows/types/flow-action";
import { Button } from "@chakra-ui/react";
import { postActionDispatcher } from "@/flows/post-action-dispatcher";

type ActionProps = { action: FlowAction; response: string };

function PostFlowAction({ action, response }: ActionProps) {
  const gptResponse = response;

  const clickButton = () => {
    postActionDispatcher(action, gptResponse).then((r) => console.log(r));
  };

  return (
    <div>
      <Button colorScheme='twitter' className='bg-blue' onClick={clickButton}>
        {action.name}
      </Button>
    </div>
  );
}

export default PostFlowAction;

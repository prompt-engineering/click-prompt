import React from "react";
import { FlowAction } from "@/flows/types/flow-action";
import { Button } from "@chakra-ui/react";
import { postActionDispatcher } from "@/flows/post-action-dispatcher";
import SharedFlowAction from "@/flows/components/SharedFlowAction";

type ActionProps = { action: FlowAction; response: string };

function PostFlowAction({ action, response }: ActionProps) {
  const handleSubmit = (modifiedAction: FlowAction) => {
    postActionDispatcher(modifiedAction, response).then((r) => console.log(r));
  };

  return <SharedFlowAction action={action} onSubmit={handleSubmit} />;
}

export default PostFlowAction;

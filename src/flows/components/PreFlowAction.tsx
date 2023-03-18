import React from "react";
import { Flex } from "@chakra-ui/react";

import { FlowAction } from "@/flows/types/flow-action";

import { preActionDispatcher } from "../pre-action-dispatcher";
import SharedFlowAction from "./SharedFlowAction";
import { PostComponentDispatcher } from "@/flows/components/PostComponentDispatcher";

type ActionProps = { action: FlowAction; onResponse?: (value: any) => void };

function PreFlowAction({ action }: ActionProps) {
  const [isShowPostComponent, setIsShowPostComponent] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);

  const postComponents = action.postComponents;
  const hasPostComponent = postComponents?.length && postComponents?.length > 0;

  const handleSubmit = (modifiedAction: FlowAction) => {
    preActionDispatcher(modifiedAction).then((r) => {
      if (r.success) {
        setResult(r.result);
        if (hasPostComponent) {
          setIsShowPostComponent(true);
        }
      }
    });
  };

  return (
    <Flex flexDirection={"column"}>
      <SharedFlowAction action={action} onSubmit={handleSubmit} />
      {isShowPostComponent && hasPostComponent && PostComponentDispatcher(postComponents, result)}
    </Flex>
  );
}

export default PreFlowAction;

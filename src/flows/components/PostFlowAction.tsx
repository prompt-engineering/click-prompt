import React from "react";

import { FlowAction } from "@/flows/types/flow-action";
import { postActionDispatcher } from "@/flows/post-action-dispatcher";
import SharedFlowAction from "@/flows/components/SharedFlowAction";
import { PostComponentDispatcher } from "@/flows/components/PostComponentDispatcher";

type ActionProps = { action: FlowAction; response: string };

function PostFlowAction({ action, response }: ActionProps) {
  const [isShowPostComponent, setIsShowPostComponent] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);

  const postComponents = action.postComponents;
  const hasPostComponent = postComponents?.length && postComponents?.length > 0;

  const handleSubmit = (modifiedAction: FlowAction) => {
    postActionDispatcher(modifiedAction, response).then((r) => {
      if (r.success) {
        setResult(r.result);
        if (hasPostComponent) {
          setIsShowPostComponent(true);
        }
      }
    });
  };

  return (
    <>
      <SharedFlowAction action={action} onSubmit={handleSubmit} />
      {isShowPostComponent && hasPostComponent && PostComponentDispatcher(postComponents, result)}
    </>
  );
}

export default PostFlowAction;

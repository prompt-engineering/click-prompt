import React from "react";

import { ActionProcess, FlowAction } from "@/flows/types/flow-action";
import { postActionDispatcher } from "@/flows/post-action-dispatcher";
import SharedFlowAction from "@/flows/components/SharedFlowAction";
import { PostComponentDispatcher } from "@/flows/components/PostComponentDispatcher";
import { jsonPath } from "@/flows/flow-functions/jsonPath";

type ActionProps = { action: FlowAction; response: string };

function processDispatcher(postProcesses: ActionProcess[], data: any) {
  //iterator postProcesses and set to result
  let result = data;
  postProcesses.forEach((process) => {
    switch (process.function) {
      case "jsonPath":
        if (!process.args || process.args.length < 2) {
          throw new Error("jsonPath function need 2 arguments");
        }
        jsonPath(result, process.args[0], process.args[1]);
        break;
      case "fromMarkdown":
        break;
      case "toMarkdown":
        break;
      default:
        break;
    }
  });

  return result;
}

function PostFlowAction({ action, response }: ActionProps) {
  const [isShowPostComponent, setIsShowPostComponent] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);

  const postComponents = action.postComponents;
  const hasPostComponent = postComponents?.length && postComponents?.length > 0;

  const handleSubmit = (modifiedAction: FlowAction) => {
    postActionDispatcher(modifiedAction, response).then((r) => {
      if (r.success) {
        // handle in here
        if (action.postProcess) {
          processDispatcher(action.postProcess, r.result);
        }
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
